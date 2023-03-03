// 1.quote multiple tweet form display
// 2.retweet
// 3.posted twet dropdown option


{
    "mappings": {
      "dynamic": false,
      "fields": {
        "active": {
          "type": "boolean"
        },
        "name": [
          {
            "foldDiacritics": true,
            "maxGrams": 15,
            "minGrams": 2,
            "tokenization": "edgeGram",
            "type": "autocomplete"
          },
          {
            "type": "string"
          }
        ]
      }
    },
    "storedSource": {
      "include": [
        "_id",
        "name",
        "avatar",
        "profilePic"
      ]
    }
  }

const tweets =


const all_chat_message=