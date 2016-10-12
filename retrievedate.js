var exports = module.exports = {};

exports.getDate = function(date) {
    // Trim whitespace
    date = date.trim();
    
    var natural = getNaturalTimestamp(date);
    var unix = getUnixTimestamp(date);
    
    // Return natural timestamp
    if (natural) {
        return natural;
    }
    // Return unix timestamp
    else if (unix) {
        return unix;
    }
    // Neither date was found - return nulls
    else {
        return { "unix": null, "natural": null };
    }
};

// Gets unix timestamp if it exists
// @date: date to check for unix timestamp
function getUnixTimestamp(date) {
    var unixRE = /-?\d+/;
    if (unixRE.test(date)) {
        var unixTS = unixRE.exec(date)[0];
        return  { 
            "unix": unixTS,
            "natural": unixToNatural(unixTS)
        };
    }
    
    return false;
}

// Gets natural timestamp if it exists
// @date: date to check for natural timestamp
function getNaturalTimestamp(date) {
    var naturalRE = /(Jan|January|Feb|February|Mar|March|Apr|April|May|June|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s?(\d{1,2})(\s|,\s)?(\d{4})/i;
    if (naturalRE.test(date)) {
        var naturalTS = naturalRE.exec(date);
        // Use array from exec method to get the formatting right
        var natural = naturalTS[1].charAt(0).toUpperCase() + 
                    naturalTS[1].substr(1) + ' ' + naturalTS[2] +
                    ', ' + naturalTS[4];
        
        return { 
            "unix": new Date(natural).getTime() / 1000, 
            "natural": natural
        };
    }
    
    return false;
}

// Convert a unix timestamp to a natural timestamp
// @unixTS: unix timestamp to be converted
function unixToNatural(unixTS) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
    var date = new Date(unixTS * 1000);
    
    return months[date.getMonth()] + ' ' + date.getDate()+ ', ' 
                + date.getFullYear();
}