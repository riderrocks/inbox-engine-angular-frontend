var UserNotificationService = app.service('UserNotificationService', ['$q', '$http', 'CommonProp', 'CONFIG', '$filter', function ($q, $http, CommonProp, CONFIG, $filter) {
    this.baseUrl = CONFIG.INBOX.baseUrl;
    this.userId = CommonProp.getUserId();
    this.userEmail = CommonProp.getUser();

    this.notifyBookMovie = function (movie) {
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
                    "text": "sample text",
                    "link": "http://in.bookmyshow.com/notifi/",
                    "target": "_target"
                }]
            }, {
                "appCode": "M4",
                "callToAction": [{
                    "text": "sample text",
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

    this.prepareData = function (data, isNotification) {
        var announcement = [];
        var mongoIdArray = {};
        var response_id = [];
        var response_data = [];
        for (i = 0; i < data.length; i++) {
            announcement[i] = {
                id: data[i]._id,
                memberId: data[i].memberId ? data[i].memberId : null,
                createdOn: new Date(data[i].createdOn).toUTCString().slice(0, 22),
                imgURL: data[i].imgURL,
                longTxt: data[i].longTxt,
                shortTxt: data[i].shortTxt,
                viewed: data[i].viewed,
                callToAction: data[i].callToAction[0].link,
                isNotification: isNotification,
            };
            response_id.push(data[i]._id);
            response_data.push(announcement[i]);

        }
        mongoIdArray.data = response_data;
        mongoIdArray.id = response_id;
        return mongoIdArray;
    }

    this.getAllNotifications = function () {
        currentObject = this;
        var announcement_ids = [];
        var notification_ids = [];
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: this.baseUrl + "inbox/get",
            data: {
                "appCode": "WEBIN",
                "regionCode": "MUM",
                "memberId": this.userId
            }
        }).then(function successCallback(response) {
            var notifications = currentObject.concatAnnouncementAndNotifications(currentObject.prepareData(response.data.announcements, false), currentObject.prepareData(response.data.notifications, true));
            defer.resolve(notifications);

        });
        return defer.promise;
    }

    this.setSubscription = function (memberId, registrationId) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: this.baseUrl + "inbox/set",
            data: {
                "flag": "F",
                "memberId": memberId,
                "registrationId": registrationId,
                "userAgent": "chrome"
            }
        }).then(function successCallback(response) {
            defer.resolve(response);
        });
        return defer.promise;
    }

    this.concatAnnouncementAndNotifications = function (announcement, notification) {
        for (var i = 0; i < announcement.data.length; i++) {
            notification.data.push(announcement.data[i]);
            notification.id.push(announcement.id[i]);
        }
        return notification;
    }

    this.updateNotViewedCount = function (notifications) {
        var notViewedCount = $filter('filter')(notifications.data, {
            viewed: false
        }).length;
        return notViewedCount;
    }
}]);
