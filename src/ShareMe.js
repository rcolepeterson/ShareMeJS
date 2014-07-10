/* global FB, jQuery */
'use strict';
/*
 * ShareMe.js
 * http://www.possible.com
 * cole.peterson@possible.com
 */
var possible = this.possible || {};
(function($) {

    /**
     * Global utility for sharing assets via FB, Twitter, and Pinterest.  The ShareMe class uses a static interface (ex. <code>ShareMe.openFacebook(title, desc, shareUrl, picture)</code>)
     * and should not be instantiated.
     * @class ShareMe
     * @static
     */
    var ShareMe = function() {
        throw 'ShareMe cannot be instantiated';
    };

    var toolbar = 'toolbar=0,status=0,width=680,height=380';

    /**
     * Opens FaceBook Share interface in a dialogue. You will need a FB AppId and the Facebook SDK script inserted in your HTML.
     * @param  {String} title       Share title
     * @param  {String} caption     Share caption.
     * @param  {String} desc        Share description.
     * @param  {String} shareUrl    URL to share.
     * @param  {String} picture     Path to image to share.
     * @param  {String} appid       Facebook Application Id
     * @param  {String} cb          Facebook Callback
     */
    ShareMe.openFacebook = function(title, caption, desc, shareUrl, picture, appid, cb) {


        if (!appid) {
            console.error('ShareMe.openFacebook. You did not pass in a appid');
        }

        if (!ShareMe.fbApiInit) {
            FB.init({
                appId: appid,
                status: true,
                xfbml: true
            });
        }

        ShareMe.fbApiInit = true; //FB init flag

        var shareObj = {
            method: 'feed',
            name: title,
            description: desc,
            caption: caption,
            link: shareUrl,
            picture: picture
        };
        FB.ui(shareObj,
            function(response) {
                if (cb) {
                    cb(response);
                }
            }
        );

    };

    /**
     * Opens Twitter Share interface in a dialogue.
     * @param  {[type]} desc     [description]
     * @param  {[type]} shareUrl [description]
     * @param  {[type]} picture  [description]
     */
    ShareMe.openTwitter = function(desc, shareUrl) {
        window.open('http://twitter.com/share?text=' + encodeURIComponent(desc) + '&url=' + encodeURIComponent(shareUrl), 'share', toolbar);
    };

    /**
     * Opens Pinterest Share interface in a dialogue.
     * @param  {[type]} desc
     * @param  {[type]} shareUrl
     * @param  {[type]} picture
     */
    ShareMe.openPinterest = function(desc, shareUrl, picture) {
        window.open('http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareUrl) + '&media=' + picture + '&description=' + encodeURIComponent(desc), 'share', toolbar);
    };

    /**
     * Initialize global sharing, set defaults and add click handlers.
     * @param  {object} sharingData     Object holding sharing values.

        <h4>Example</h4>

        //html
        <a class="facebook_custom" href="#">Facebook</a>

        //expected value object
        var sharingData = {
            classSelectorFacebook: ".facebook_custom", //class name of facebook btns. can be anything.
            facebookAppId: "1407543382833493", //facebook AppId,
            faceBookCallBack: faceBookCallBack, //facebook callback
            classSelectorTwitter: ".twitter_custom", //twitter btns
            classSelectorPinterest: ".pinterest_custom", //twitter btns
            sharePicture: 'http://placehold.it/250x250', //image url to share
            shareTitle: "Share title",
            shareUrl: "http://www.zaaz.com", //url to share
            captionFacebook: "Facebook caption",
            descFacebook: "Facebook desc",
            descTwitter: "Twitter desc",
            descPinterest: "Pinterest desc",
        };

        possible.ShareMe.initialize(sharingData);
     */
    ShareMe.initialize = function(sharingData) {

        if (!sharingData) {
            throw 'ShareMe: No sharingData obj passed into ShareMe.initialize';
        }

        var $buttonsFacebook = $(sharingData.classSelectorFacebook),
            $buttonsTwitter = $(sharingData.classSelectorTwitter),
            $buttonsPinterest = $(sharingData.classSelectorPinterest);
        /**
         * Define handlers. FB,TW,PN.
         */
        $buttonsFacebook.on('click', function(e) {
            e.preventDefault();
            ShareMe.openFacebook(sharingData.shareTitle, sharingData.captionFacebook, sharingData.descFacebook, sharingData.shareUrl, sharingData.sharePicture, sharingData.facebookAppId, sharingData.faceBookCallBack);
        });

        $buttonsTwitter.on('click', function(e) {
            e.preventDefault();
            ShareMe.openTwitter(sharingData.descTwitter, sharingData.shareUrl, sharingData.sharePicture);
        });

        $buttonsPinterest.on('click', function(e) {
            e.preventDefault();
            ShareMe.openPinterest(sharingData.descPinterest, sharingData.shareUrl, sharingData.sharePicture);
        });
    };

    possible.ShareMe = ShareMe;

}(jQuery));
