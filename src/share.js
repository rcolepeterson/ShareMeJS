// namespace:
this.possible = this.possible || {};

(function() {
    "use strict";

    /**
     * Global utility for sharing assets via FB, Twitter, and Pinterest.  The ShareThis class uses a static interface (ex. <code>ShareThis.openFacebook(title, desc, shareUrl, picture)</code>)
     * and should not be instantiated.
     * @class ShareThis
     * @static
     **/
    var ShareThis = function() {
        throw "ShareThis cannot be instantiated";
    }

    var toolbar = "toolbar=0,status=0,width=680,height=380";

    /**
     * Opens FaceBook Share interface in a dialogue.
     * (Use this directly to bypass default).
     * @param  {String} title       Share title
     * @param  {String} desc        Share description.
     * @param  {String} shareUrl    URL to share.
     * @param  {String} picture     Path to image to share.
     */
    ShareThis.openFacebook = function(title, desc, shareUrl, picture) {
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + encodeURIComponent(title) + '&p[summary]=' + encodeURIComponent(desc) + '&p[url]=' + encodeURIComponent(shareUrl) + '&p[images][0]=' + picture, 'share', toolbar);
    }

    /**
     * Opens Twitter Share interface in a dialogue.
     * @param  {[type]} desc     [description]
     * @param  {[type]} shareUrl [description]
     * @param  {[type]} picture  [description]
     */
    ShareThis.openTwitter = function(desc, shareUrl, picture) {
        window.open('http://twitter.com/share?text=' + encodeURIComponent(desc) + '&url=' + encodeURIComponent(shareUrl), 'share', toolbar);
    }

    /**
     * Opens Pinterest Share interface in a dialogue.
     * @param  {[type]} desc
     * @param  {[type]} shareUrl
     * @param  {[type]} picture
     */
    ShareThis.openPinterest = function(desc, shareUrl, picture) {
        window.open('http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareUrl) + '&media=' + picture + '&description=' + encodeURIComponent(desc), 'share', toolbar);
    }

    /**
     * Initialize global sharing, set defaults and add click handlers.
     * @param  {[type]} sharingData     Object holding sharing values.
     
        <h4>Example</h4>

        //html
        <a class="facebook_custom" href="#">Facebook</a>

        //expected value object
        var sharingData = {
            classSelectorFacebook: ".facebook_custom", //class name of facebook btns. can be anything.
            classSelectorTwitter: ".twitter_custom", //twitter btns
            classSelectorPinterest: ".pinterest_custom", //twitter btns
            sharePicture: 'http://placehold.it/250x250', //image url to share
            shareTitle: "Share title",
            shareUrl: "http://www.zaaz.com", //url to share
            descFacebook: "Facebook desc",
            descTwitter: "Twitter desc",
            descPinterest: "Pinterest desc",
        };

        possible.ShareThis.initialize(sharingData);
     
     */
    ShareThis.initialize = function(sharingData) {

        if (!sharingData) {
            throw "ShareThis: No sharingData Obj passed into ShareThis.initialize";
        }

        var $buttonsFacebook = $(sharingData.classSelectorFacebook),
            $buttonsTwitter = $(sharingData.classSelectorTwitter),
            $buttonsPinterest = $(sharingData.classSelectorPinterest);

        /**
         * Define handlers. FB,TW,PN.
         */
        $buttonsFacebook.on('click', function(e) {
            e.preventDefault();
            ShareThis.openFacebook(sharingData.shareTitle, sharingData.descFacebook, sharingData.shareUrl, sharingData.sharePicture)
        });

        $buttonsTwitter.on('click', function(e) {
            e.preventDefault();
            ShareThis.openTwitter(sharingData.descTwitter, sharingData.shareUrl, sharingData.sharePicture)
        });

        $buttonsPinterest.on('click', function(e) {
            e.preventDefault();
            ShareThis.openPinterest(sharingData.descPinterest, sharingData.shareUrl, sharingData.sharePicture)
        });
    }

    possible.ShareThis = ShareThis;

}());
