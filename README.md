ShareMeJS
==========
Global utility for sharing assets via FB, Twitter, and Pinterest.
Nice to use when you want to share FB content NOT defined via Open Graph meta data. 

Note: Facebook needs and APP Id passed in. Due to changes in the FaceBook API, you can no longer pass an image to their sharer.php script and have it show up in the user’s feed. 

To obtain a FaceBook AppID, go to the FB developer page and create an APP for each environment you want to test the FB functionality. https://developers.facebook.com

You will also need to include the JS Facebook SDK in your html.
[connect.facebook.net/en_US/all.js]


<h5>Example</h5>
    //Elements with the selector you define and pass in will init the share service on click.
    <a class="facebook_custom" href="#">Facebook</a>
    <a class="twitter_custom" href="#">Twitter</a>
    <a class="pinterest_custom" href="#">Pinterest</a>

    var sharingData = {
        classSelectorFacebook: ".facebook_custom", //class name of facebook btns. can be anything.
        facebookAppId: [Your Facebook AppId], //facebook AppId
        classSelectorTwitter: ".twitter_custom", //twitter btns
        classSelectorPinterest: ".pinterest_custom", //twitter btns
        sharePicture: 'http://placehold.it/250x250', //image url to share
        shareTitle: "Share title",
        shareUrl: "http://www.zaaz.com", //url to share
        captionFacebook: "Facebook caption",
        descFacebook: "Facebook desc",
        descTwitter: "Twitter desc",
        descPinterest: "Pinterest desc"
    };
    
    possible.ShareMe.initialize(sharingData);
<p>API for sharing dynamic content not defined via the initialize method.</p>
<h5>Example</h5>
    <a class=".testme" href="#">fb</a>
    
    $('.testme').on('click', function() {
            var shareTitle = "my title",
            captionFacebook: "Facebook caption",
            fbDesc = "cool desc",
            shareUrl = "http://possible.com",
            picture = "http://placehold.it/350x150",
            facebookAppId = [Your Facebook AppId]; //facebook AppId
    
        possible.ShareMe.openFacebook(shareTitle, fbDesc, captionFacebook, shareUrl, picture, facebookAppId);
    });

<a href="http://rcolepeterson.com/ShareMeJS/example/index.html" target="_blank">DEMO</a>
