/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var profile = angular.module('ZDSGUI.pages.profile');

    profile.controller('userinfo', function ($scope,zdsSocket,toastr) {
        $scope.un = myun;
        $scope.name = myname;
        $scope.updateinfo = function () {
            var msg = {
                type: "call",
                node: "userman.modifyUser",
                data: {userID: uid,username: $scope.un,name: $scope.name,password: $scope.pwd}
            };

            console.log(JSON.stringify(msg));
            zdsSocket.send(msg, function (data) {
                if (data["success"] == true) {
                    toastr.success('اطلاعات کاربری بروز شد!');
                } else {
                    toastr.danger('خطا!');
                }
            });
        };
    });







    profile.controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, zdsSocket, $filter, $uibModal, toastr) {
        //$scope.picture = $filter('profilePicture')('Nasta');






        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.mypic = function () {
            var msg = {
                type: "call",
                node: "userman.getUserAvatar",
                data: {userID: uid}
            };
            if (zdsSocket.status() == 1) {
                console.log(JSON.stringify(msg));
                zdsSocket.send(msg, function (data) {
                    if (data["success"] == true) {
                        //toastr.success('اطلاعات با موفقیت اعمال شد');
                        mypic = data.data.image;
                        mypic = mypic.replace(/\\/g, "");
                        mypic = "data:image/png;base64," + mypic;
                        document.getElementById('mypic').setAttribute('src', mypic);
                        document.getElementById('ppic').setAttribute('src', mypic);
                    } else {
                        toastr.error('!', 'خطا!');

                        //$scope.LoginDisabled = false;
                    }
                });
            } else {
                toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

            }
        }
        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            var f = fileInput.files[0];
            var fr = new FileReader();
            fr.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var encoded = btoa(binaryString);


                var msg = {
                    type: "call",
                    node: "userman.setUserAvatar",
                    data: {userID: uid, image: encoded}
                };
                if (zdsSocket.status() == 1) {
                    console.log(JSON.stringify(msg));
                    var temp = "data:image/png;base64," + encoded;

                    zdsSocket.send(msg, function (data) {
                        if (data["success"] == true) {
                            toastr.success('اطلاعات با موفقیت اعمال شد');
                            document.getElementById('ppic').setAttribute('src', temp);
                            document.getElementById('mypic').setAttribute('src', temp);
                        } else {
                            toastr.error('!', 'خطا!');

                            //$scope.LoginDisabled = false;
                        }
                    });
                } else {
                    toastr.error('اتصال با وبسوکت برقرار نیست!!', 'خطا!');

                }
            };

            fr.readAsBinaryString(f);
            //var encoded = window.btoa(f);

        };

        $scope.socialProfiles = [
            {
                name: 'Facebook',
                href: 'https://www.facebook.com/akveo/',
                icon: 'socicon-facebook'
            },
            {
                name: 'Twitter',
                href: 'https://twitter.com/akveo_inc',
                icon: 'socicon-twitter'
            },
            {
                name: 'Google',
                icon: 'socicon-google'
            },
            {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/company/akveo',
                icon: 'socicon-linkedin'
            },
            {
                name: 'GitHub',
                href: 'https://github.com/akveo',
                icon: 'socicon-github'
            },
            {
                name: 'StackOverflow',
                icon: 'socicon-stackoverflow'
            },
            {
                name: 'Dribbble',
                icon: 'socicon-dribble'
            },
            {
                name: 'Behance',
                icon: 'socicon-behace'
            }
        ];

        $scope.unconnect = function (item) {
            item.href = undefined;
        };

        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/profileModal.html'
            }).result.then(function (link) {
                item.href = link;
            });
        };

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                });
        };

        $scope.switches = [true, true, false, true, true, false];

        $scope.mypic();
    }

})();
