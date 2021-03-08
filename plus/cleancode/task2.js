const speakers = get(types.speaker);
const talks = get(types.talk);
const events = get(types.event);

countSpeakersTalks({ speaker, talks, events });

function countSPeakersTalks({ speakers, talks, events }) {
    speakers.forEach(speaker => {
        countSpeakerTalks({ speaker, talks, events });
    });
}

function countSpeakerTalks({ speaker, talks, events }) {
    const talksOfSpeaker = searchTalksOfSpeaker(speaker.id, talks);
    talksOfSpeaker.forEach(givenTalk => {
        setPresentationCountOfTalks(givenTalk, events)
    });
}

function searchTalksOfSpeaker(speakerId, talks) {
    return talks.filter(talk => doesTalkContainsSpeaker(talk, speakerId));
}

function doesTalkContainsSpeaker(talk, speakerId) {
    return talk.speaker === speakerId;
}

function setPresentationCountOfTalks(talk, events) {
    const presentationCount = getTalkCountInEvents(talk.id, events);
    talk.presentationCount = presentationCount;
}

function getTalkCountInEvents(talkId, events) {
    let numberOfOccurences = 0;
    events.forEach(event => {
        if (doesEventContainTalk(event, talkId)) {
            numberOfOccurences++;
        }
    });
    return numberOfOccurences;
}

function doesEventContainTalk(event, talk) {
    return event.talks.includes(talk);
}