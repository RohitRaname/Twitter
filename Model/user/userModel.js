const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// contains all user imformation
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 1,
      // required: [true, 'Please enter the name'],
    },

    avatar: { type: String },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
      // required: [true, 'Email is required'],
    },
    password: {
      type: String,
      // required: [true, 'Password is required'],
      select: false,
      minLength: 8,
    },

    active: {
      type: Boolean,
      default: true,
    },
    verify: {
      default: false,
      type: Boolean,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Role is required',
      },
      trim: true,
      default: 'user',
    },

    // normllaize read too much write rarely

    // thousand of id in a user is not a good thing

    passwordChangedAt: Date,
    tokenHash: String,
    tokenExpiresIn: Date,

    invalidRefreshTokenTries: {
      default: 0,
      type: Number,
    },

    blackList: {
      type: Boolean,
      default: false,
    },

    trackUserActivity: {
      type: Boolean,
      default: false,
    },

    // info
    bio: { type: String, default: '' },
    birthDate: Date,
    profilePic: { type: String, default: 'default.png' },
    cover_pic: { type: String, default: 'default_cover.png' },
    location: { type: String, default: '' },
    website_link: { type: String, default: '' },

    // stats
    // TWEETS RELATED
    following_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    posted_tweets_count: { type: Number, default: 0 },
    liked_tweets_count: { type: Number, default: 0 },
    circle_count: { type: Number, default: 0 },

    // tweeet
    muted_user_id_arr: [String],
    blocked_user_id_arr: [String],
    circle_user_id_arr: [String],

    // load this when i see user profile
    pinned_tweet_id_arr: [String],

    chat_id_arr: [String],
    chat_user_id_arr: [String],
    pinned_chat_id_arr: [String],
    mute_chat_id_arr: [String],

    customization: {
      color: { type: String, default: 'primary' },
      theme: { type: String, default: 'dark' },
      font_size: { type: String, default: '62.25%' },
    },

    // other-accounts of users to switch
    other_accounts: [
      {
        name: String,
        profilePic: String,
        avatar: String,
      },
    ],

    settings_page_permit:{type:Boolean,default:false}
  },
  {
    toObject: { virtual: true },
    toJSON: { virtual: true },
    timestamps: true,
  }
);

// INDEX ****************************************************************
UserSchema.index({ email: 1 }, { unique: true });

// VIRTUAL PROPERTY ****************************************************
UserSchema.virtual('joined').get(function () {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(this.createdAt);
});

// METHODS ****************************************************************

// compare password after login and check for password changed at
UserSchema.methods.isValidPassword = async function (
  inputPassword,
  passwordDB
) {
  return await bcrypt.compare(inputPassword, passwordDB);
};

UserSchema.methods.removeUserCredentialfromReq = function () {
  this.password = undefined;
  this.active = undefined;
  // this.confirmPassword = undefined;
};

// handle token send for tpassword
UserSchema.methods.setTokenPropertiesAndgetTokenCode = function () {
  const token = crypto.randomBytes(6).toString('hex');
  this.tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  this.tokenExpiresIn = new Date(Date.now() + 10 * 60 * 1000);

  return token;
};

UserSchema.methods.removeTokenProperties = function () {
  this.tokenHash = undefined;
  this.tokenExpiresIn = undefined;
};

UserSchema.methods.compareToken = function (tokenDB, token) {
  const tokenHash = crypto
    .createHash('sha256')
    .update(token)
    .update(token)
    .digest('hex');
  return tokenHash === tokenDB;
};

// PRE MIDDLEWARE ****************************************************************

// hash password  before saving
UserSchema.pre('save', function (next) {
  // this is for newCreated user
  if (this.hash_password) {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  if (this.isNew) {
    this.avatar = `@${this.email.split('@')[0]}`;
  }

  if (!this.isNew && !this.hash_password && this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// this filter the data before any find query
UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// UserSchema.pre('aggregate', function (next) {
//   // this.pipeline.unshift({ $match: { active:  true } });

//   next();
// });

const User = mongoose.model('user', UserSchema);

module.exports = User;
