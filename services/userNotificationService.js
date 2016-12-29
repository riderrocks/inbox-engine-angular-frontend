var UserNotificationService = app.service('UserNotificationService', ['$q', '$http', 'CommonProp', 'CONFIG', '$filter', function($q, $http, CommonProp, CONFIG, $filter) {
    this.baseUrl = CONFIG.INBOX.baseUrl;
    this.userId = CommonProp.getUserId();
    this.userEmail = CommonProp.getUser();

    this.notifyBookMovie = function(movie) {
        var notification = {
            "shortTxt": movie.title || movie.arrET[0].Event_strTitle,
            "createdOn": "2015-07-18T16:16:39.669Z",
            "memberEmail": this.userEmail || movie.arrTT[0].Trans_strAlertMail,
            "memberId": this.userId || movie.arrTT[0].Member_lngId,
            "type": "system",
            "sequence": 1,
            "validFrom": "2016-10-01T00:00:00.000Z",
            "validTill": "2016-12-01T23:59:59.000Z",
            "flag": "N",
            "appCodes": [{
                "appCode": "WEBIN",
                "callToAction": [{
                    "text": "More Info",
                    "link": "http://in.bookmyshow.com/notifi/",
                    "target": "_target"
                }]
            }, {
                "appCode": "M4",
                "callToAction": [{
                    "text": "More Info",
                    "link": "http://in.bookmyshow.com/notifi/",
                    "target": "_target"
                }]
            }],
            "imgURL": movie.imgurl ? movie.imgurl : null,
            "longTxt": "Hi Customer, Booking ID: " + (movie.Booking_lngId || movie.arrTT[0].Booking_lngId) + ". Seats: " + (movie.Trans_strSeatInfo || movie.arrTT[0].Trans_strSeatInfo) + " for " + (movie.title || movie.arrET[0].Event_strTitle) + " on " + (movie.Session_dtmRealShow || movie.arrSS[0].Session_dtmRealShow) + " at " + (movie.Venue_strCode || movie.arrTTD[0].Venue_strCode) + ". Please carry your CC/DC card which was used for booking tickets."
        };
        $http({
            method: 'POST',
            url: this.baseUrl + "inbox/set",
            data: notification
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    this.prepareData = function(data) {
        var announcement = [];
        var mongoIdArray = {};
        var response_id = [];
        var response_data = [];
        for (i = 0; i < data.length; i++) {
            // if (data[i].callToAction[0].text == '' || data[i].callToAction[0].text == 'sample text') {
            //     data[i].callToAction[0].text = 'Learn More';
            // }

            announcement[i] = {
                id: data[i]._id,
                memberId: data[i].memberId ? data[i].memberId : null,
                createdOn: formatDate(new Date(data[i].createdOn)),
                imgURL: data[i].imgURL,
                longTxt: data[i].longTxt,
                shortTxt: data[i].shortTxt,
                viewed: data[i].viewed,
                target: data[i].callToAction[0].target,
                callToAction: data[i].callToAction[0].link,
                text: data[i].callToAction[0].text,
                isNotification: !data[i].isAnnouncement,
            };
            response_id.push(data[i]._id);
            response_data.push(announcement[i]);

        }
        mongoIdArray.data = response_data;
        mongoIdArray.id = response_id;
        return mongoIdArray;
    }

    function formatDate(date) {
        var dateDisp = new Date(date).toString().slice(0, 16);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return dateDisp + '' + strTime;
    }

    this.getAllNotifications = function() {
        currentObject = this;
        var announcement_ids = [];
        var notification_ids = [];
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: this.baseUrl + "inbox/get",
            data: {
                "appCode": "WEBIN",
                "regionCode": "MUMBAI",
                "memberId": this.userId
            }
        }).then(function successCallback(response) {
            var notifications = currentObject.prepareData(response.data);
            console.log(notifications);
            defer.resolve(notifications);
        });
        return defer.promise;
    }

    this.setSubscription = function(memberId, registrationId, userAgent) {
        // console.log("here is"+registrationId);
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: this.baseUrl + "inbox/set",
            data: {
                "flag": "F",
                "memberId": memberId,
                "registrationId": registrationId,
                "userAgent": userAgent,
                "regionCode": "MUMBAI"
            }
        }).then(function successCallback(response) {
            defer.resolve(response);
        });
        return defer.promise;
    }

    this.concatAnnouncementAndNotifications = function(announcement, notification) {
        for (var i = 0; i < announcement.data.length; i++) {
            notification.data.push(announcement.data[i]);
            notification.id.push(announcement.id[i]);
        }
        return notification;
    }

    this.updateNotViewedCount = function(notifications) {
        var notViewedCount = $filter('filter')(notifications.data, {
            viewed: false
        }).length;
        return notViewedCount;
    }

    this.fetchMemberIdFromEmailId = function(value) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: this.baseUrl + 'cms/fetch/email',
            data: {
                memberEmail: value
            }
        }).success(function(response) {
            console.log(response);
            defer.resolve(response);
        });

        return defer.promise;
    }

    /*************************Sending Subsciption Id to Server*********************************/

    this.subscribeForBrowserNotification = function() {
        var browser = '';
        var browserVersion = 0;
        if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            browser = 'Opera';
        } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            browser = 'MSIE';
        } else if (/Navigator[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            browser = 'Netscape';
        } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            browser = 'Chrome';
        } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            browser = 'Safari';
            /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent);
            browserVersion = new Number(RegExp.$1);
        } else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            browser = 'Firefox';
        }
        if (browserVersion === 0) {
            browserVersion = parseFloat(new Number(RegExp.$1));
        }
        var userAgent = browser;
        if (localStorage.notification_subscribe === "true") {
            this.setSubscription(localStorage.userId, localStorage.subscriptionId, userAgent);
            localStorage.setItem('notification_subscribe', false);
        } else if (localStorage.subscribedAsGuestUser === "true") {
            this.setSubscription(localStorage.userId, localStorage.subscriptionId, userAgent);
            if (localStorage.userId) {
                localStorage.setItem('subscribedAsGuestUser', false);
            }
        }
    }
}]);
