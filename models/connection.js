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
        image: '../images/tiaa.png'
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
        image: '../images/bofa.png'
    },
    {
        id: '3',
        topic: 'intern',
        title: 'Meet with a UNCC Careers Counselor',
        description: 'Meet with a UNCC Careers Counselor with information on how to make your resume stand out.',
        host: 'James Jameson',
        date: DateTime.local(2022, 10, 21, 18, 0).toLocaleString(Date),
        start: '3:00 PM',
        end: '4:00 PM',
        location: 'Woodward Hall Room 140',
        image: '../images/uncc.png'
    },
    {
        id: '4',
        topic: 'tutor',
        title: 'CCI Tutoring Q & A Live Session',
        description: 'Join the CCI Tutoring Department for a Q & A',
        host: 'Jake Earing',
        date: DateTime.local(2022, 10, 24, 20, 0).toLocaleString(Date),
        start: '2:30 PM',
        end: '3:30 PM',
        location: 'Woodward Hall Room 250',
        image: '../images/CCI.png'
    },
    {
        id: '5',
        topic: 'tutor',
        title: 'Dr. Harini Ramaprasad CCI Tutoring Hiring Event',
        description: 'Interested in joining the CCI Tutoring Team? We will answer all questions and speak to possible future applicants',
        host: 'Dr. Harini Ramaprasad',
        date: DateTime.local(2022, 10, 24, 14, 0).toLocaleString(Date),
        start: '1:45 PM',
        end: '2:30 PM',
        location: 'Woodward Hall Room 141',
        image: '../images/CCI.png'
    },
    {
        id: '6',
        topic: 'tutor',
        title: 'CCI Tutoring Final Exam Preparation',
        description: 'Multiple tutors from the CCI Tutoring Department will be available to help all CCI students prepare for their final exams and projects.',
        host: 'Jake Earing',
        date: DateTime.local(2022, 10, 24, 20, 0).toLocaleString(Date),
        start: '5:00 PM',
        end: '6:00 PM',
        location: 'Woodward Hall Room 250',
        image: '../images/CCI.png'
    }
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.save = event => {
    event.id = uuidv4();
    //Add placeholder image to event
    event.image = '../images/placeholder.png';
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
    //Add placeholder image to event
    event.image = '../images/placeholder.png';
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