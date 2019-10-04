module.exports = {
    newClient: function(collection, info, callback) {
        collection.findOne({
            username: info.username
        }).then(function(user) {
            if (!user) {
                collection.insertOne({
                    username: info.username,
                    title: info.title,
                    first: info.first,
                    middle: info.middle,
                    last: info.last,
                    email: info.email,
                    industries: info.industries
                });
            }

            callback(user);
        });
    },
    updateClientInfo: function(collection, info) {
        collection.findOne({
            username: info.username
        }).then(function(user) {
            collection.updateOne({username: username}, {
                username: info.username,
                title: info.title,
                first: info.first,
                middle: info.middle,
                last: info.last,
                email: info.email,
                industries: info.industries
            });

            callback(user);
        });
    },
    getClientInfo: function() {
        
    }
}