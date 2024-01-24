// Classes

// defines a trial, with all the necessary information
class Trial {
    constructor(sid, bro, sco, ccf, ac, la, ss, prv, con, st, et, ik, tt, cor, ts, tnu, trt, drt, fb) {
        this.subjectID = sid;
        this.browser = bro;
        this.ScoopColor = sco;
        this.CupConfiguration = ccf;
        this.Start = ac;
        this.Object_1 = la;
        this.Object_2 = ss;
        this.PredValue = prv;
        this.congruence = con;
        this.startTime = st; // for entire HIT
        this.endTime = et; // for entire HIT (only updates at the end)
        this.inputKey = ik;
        this.targetType = tt;
        this.correctness = cor;
        this.tooSlow = ts;
        this.trialNumber = tnu;
        this.trialResponseTime = trt; // for *entire* trial, not just diplayed portion
        this.displayedResponseTime = drt; // from display to reaction
        this.feedback = fb;
    }
}

//////////////////////////////////////////////////////

// Functions

// cartesian product (this is magic from stackoverflow user rsp)
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

// Fisher-Yates Shuffle for shuffling trial list (credit to Mike Bostock)
function shuffle(array) {
    var m = array.length,
        t, i;
    // While there remain elements to shuffle
    while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

// get browser (credit to Nimesh and other users of stackoverflow)
function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Firefox";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        return "IE";
    } else {
        return "Unknown";
    }
}

// get inferred subject ID from URL (credit to Eyal Peer)
function getSubjectID() {
    var paramstr = window.location.search.substring(1);
    var parampairs = paramstr.split("&");
    for (i in parampairs) {
        var pair = parampairs[i].split("=");
        if (pair[0] == "PROLIFIC_PID")
            return pair[1];
    }
}