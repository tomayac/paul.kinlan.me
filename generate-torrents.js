var createTorrent = require('create-torrent')
var fs = require('fs')

var podcastCandidates = fs.readdirSync('static/podcasts/');
var podcasts = [];

for(var i = 0; i < podcastCandidates.length; i++) {
    
    let podcast = podcastCandidates[i];

    if(podcast.endsWith('.mp3') || podcast.endsWith("webm")) {
      podcasts.push(podcast);
    }
}

podcasts.forEach(podcast => {
    createTorrent('static/podcasts', {
        urlList: [`https://paul.kinlan.me/podcasts/${podcast}`]
        }, function (err, torrent) {
            if (!err) {
                // `torrent` is a Buffer with the contents of the new .torrent file 
                fs.writeFile('static/podcasts/' + podcast + '.torrent', torrent)
            }
    })
})