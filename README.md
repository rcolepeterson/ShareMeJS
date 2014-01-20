ShareThisJS
==========
Global utility for sharing assets via FB, Twitter, and Pinterest.
Nice to use when you want to share FB content NOT defined via Open Graph meta data. 
<h5>Example</h5>
    //Elements with the selector you define and pass in will init the share service on click.
    <a class="facebook_custom" href="#">Facebook</a>
    <a class="twitter_custom" href="#">Twitter</a>
    <a class="pinterest_custom" href="#">Pinterest</a>

    var sharingData = {
        classSelectorFacebook: ".facebook_custom", //class name of facebook btns. can be anything.
        classSelectorTwitter: ".twitter_custom", //twitter btns
        classSelectorPinterest: ".pinterest_custom", //twitter btns
        sharePicture: 'http://placehold.it/250x250', //image url to share
        shareTitle: "Share title",
        shareUrl: "http://www.zaaz.com", //url to share
        descFacebook: "Facebook desc",
        descTwitter: "Twitter desc",
        descPinterest: "Pinterest desc"
    };
    
    possible.ShareThis.initialize(sharingData);
<p>API for sharing dynamic content not defined via the initialize method.</p>
<h5>Example</h5>
    <a class=".testme" href="#">fb</a>
    
    $('.testme').on('click', function() {
            var shareTitle = "my title",
            fbDesc = "cool desc",
            shareUrl = "http://possible.com",
            picture = "http://placehold.it/350x150";
    
        possible.ShareThis.openFacebook(shareTitle, fbDesc, shareUrl, picture);
    });


