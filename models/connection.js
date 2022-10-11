const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const events = [
    {
        id: '1',
        topic: 'intern',
        title: 'Connect with the TIAA recruiting team',
        description: 'Join the TIAA recruitment team for a short presention.',
        host: 'Tom Thomas',
        date: DateTime.local(2022, 10, 22).toLocaleString(Date),
        start: '1:00 PM',
        end: '1:30 PM',
        location: 'Woodward Hall Room 261',
        image: ''
    },
    {
        id: '2',
        topic: 'intern',
        title: 'Meet with a Bank of America Technical Recruiter',
        description: 'Join BofA Technical Recruiter Kathy Kate for a Q/A about working at Bank of America',
        host: 'Kathy Kate',
        date: DateTime.local(2022, 10, 21, 18, 0).toLocaleString(Date),
        start: '12:00 PM',
        end: '1:00 PM',
        location: 'Woodward Hall Room 261',
        image: ''
    },
    {
        id: '3',
        topic: 'intern',
        title: 'Meet with a Bank of America Technical Recruiter',
        description: 'Join BofA Technical Recruiter Kathy Kate for a Q/A about working at Bank of America',
        host: 'Kathy Kate',
        date: DateTime.local(2022, 10, 21, 18, 0).toLocaleString(Date),
        start: '3:00 PM',
        end: '4:00 PM',
        location: 'Woodward Hall Room 261',
        image: ''
    },
    {
        id: '4',
        topic: 'tutor',
        title: 'CCI Tutoring Q & A Live Session',
        description: 'Join BofA Technical Recruiter Kathy Kate for a Q/A about working at Bank of America',
        host: 'Kathy Kate',
        date: DateTime.local(2022, 10, 24, 20, 0).toLocaleString(Date),
        start: '2:30 PM',
        end: '3:30 PM',
        location: 'Woodward Hall Room 250',
        image: ''
    },
    {
        id: '5',
        topic: 'tutor',
        title: 'Meetup with the Tutoring Team',
        description: '',
        host: 'Kathy Kate',
        date: DateTime.local(2022, 10, 24, 14, 0).toLocaleString(Date),
        start: '1:45 PM',
        end: '2:30 PM',
        location: 'Woodward Hall Room 210',
        image: ''
    },
    {
        id: '6',
        topic: 'tutor',
        title: 'CCI Tutoring Q & A Live Session',
        description: 'Join BofA Technical Recruiter Kathy Kate for a Q/A about working at Bank of America',
        host: 'Kathy Kate',
        date: DateTime.local(2022, 10, 24, 20, 0).toLocaleString(Date),
        start: '5:00 PM',
        end: '6:00 PM',
        location: 'Woodward Hall Room 250',
        image: ''
    }
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.save = event => {
    event.id = uuidv4();
    events.push(event);
};

exports.updateById = (id,newEvent) => {
    let event = events.find(event=>event.id === id);
    if (event){
    event.host = newEvent.host;
    event.topic = newEvent.topic;
    event.title = newEvent.title;
    event.description = newEvent.description;
    event.date = newEvent.date;
    event.start = newEvent.start;
    event.end = newEvent.end;
    event.location = newEvent.location;
    event.image = newEvent.image;
    return true;
    } else {
        return false;
    }
};

exports.deleteById = id => {
    let index = events.findIndex(event => event.id === id);
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

exports.findNullType = enteredType => events.find(events=> {  
    events.forEach(event=>{
        if (event.type === enteredType){
        }
        else {
            return 0;
        }
        return 1;
    })
});