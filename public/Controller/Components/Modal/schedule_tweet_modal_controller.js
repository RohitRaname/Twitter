import ScheduleTweetFormView from "../../../View/Components/Modal/3.ScheduleTweetView.js";
let View;

const schedule_tweet_modal = document.querySelector('.form--schedule-tweet')

const control_schedule_tweet_modal = (action,data)=>{
}

if(schedule_tweet_modal){
    View = new ScheduleTweetFormView();
    View.handleScheduleForm(control_schedule_tweet_modal)

}