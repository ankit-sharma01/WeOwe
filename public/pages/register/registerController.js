app.controller('RegisterCtrl', function ($scope, $http, $location, $rootScope, $modal) {
    console.log('RegisterCtrl');



    $scope.register = function (newUser) {

        var noErr = true;
        $scope.passwordNotMatchMessage = false;
        $scope.userExistsMessage = false;



        if (newUser.password == newUser.password2) {
            console.log('password matches')

            //	if(!$scope.recepient){
            // 		console.log('NOT a recepient');
            // 		newUser.need = null;
            //  	}

            if ($scope.loc) {
                newUser.imgurl = $scope.loc;
            }
            else {
                newUser.imgurl = null;
            }

            if (newUser.need) {
                if (!(newUser.need.category)) {
                    newUser.need.category = "other";
                }
            }
            console.log(newUser);


            var res = 0;

            if (newUser.need == null) {
                $http.post("/rest/register", newUser)
	            .success(function (response) {
	                res = res + 1;
	                console.log('received response from register:' + res);
	                console.log(response);


	                if (response != null) {
	                    $rootScope.currentUser = response;
	                    console.log('new user:' + $rootScope.currentUser);
	                    $location.url("/profile");
	                }
	                else {
	                    console.log('RegisterCntrl: user exists already');

	                    $scope.userExistsMessage = true;
	                    $scope.sucessfulMessage = false;
	                    $scope.passwordNotMatchMessage = false;

	                }
	            });

            } else {
                $http.post("/rest/registerExtra", newUser)
            .success(function (response) {
                res = res + 1;
                console.log('received response from register:' + res);
                console.log(response);


                if (response != null) {
                    $rootScope.currentUser = response;
                    console.log('new user:' + $rootScope.currentUser);
                    $location.url("/profile");
                }
                else {
                    console.log('RegisterCntrl: acc no exists already');

                    $scope.userExistsMessage = true;
                    $scope.sucessfulMessage = false;
                    $scope.passwordNotMatchMessage = false;

                }
            });

            }
        }

        else {
            $scope.passwordNotMatchMessage = true;
            $scope.sucessfulMessage = false;
            $scope.userExistsMessage = false;
        }
    }

    // $scope.loc = "//placehold.it/100";

    $scope.loc = "data:image/jpeg;base64," + "/9j/4RQDRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAiYAAAEBAAMAAAABAW8AAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxMjoxMjoyMSAxOTowNDoxMgAAAAAEkAAABwAAAAQwMjIxoAEAAwAAAAH//wAAoAIABAAAAAEAAAF6oAMABAAAAAEAAAFNAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAW4BGwAFAAAAAQAAAXYBKAADAAAAAQACAAACAQAEAAAAAQAAAX4CAgAEAAAAAQAAEn0AAAAAAAAASAAAAAEAAABIAAAAAf/Y/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+0ADEFkb2JlX0NNAAL/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACNAKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDs0kklOsUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKf/Q7NJJJTrFJJJJKUkkkkpSSSdrXOcGMBc48NHJSUslOsd/DutHH6UIDsgyf3GmB/acr1dNVQitgYPIQmGY6appxWYmU/6NTvi72j/pQiO6fexhfY5jGt5Jcf8AyK2UDLxW5LA0uLS0y0jXXjUIcZ8k04iSJdRbQ/ZYIn6Lhwf6qGpFqkkkklKSSSSUpJJJJT//0ezSSSU6xSSSSSlJJJJKUtfp+KKahY4fpbBLj4DsxZB4XRJkzsExUkkko1ykkkklI7qa7qzXYJafvB8QsW+l1FrqnaxqD4g8FbyyurD9PWfFh/Ap8DrSC0kkklItUkkkkpSSSSSn/9Ls0kklOsUkkkkpSSSSSlcwPEhdEueAJcAASZGgE910KjydExUkkkmLlJJJJKUsvq389X/VP5QtRZfVv56r+qfyhOh8wQdmikkkpVqkkkklKSSSSU//0+zSSSU6xSSSSSlJJJJKbPTnEZjR+81w/wC/f99WysCm002stGuwyR5cO/6K3Wua5oc0y1wkHyKjmNV0WSSSSYlSSSSSlKn1Qxix+89o/wC/fwVxZnVbw57aG/mHc/4ke38qMdwg7NBJJJTLVJJJJKUkkkkp/9Ts0kklOsUkkkkpSSSSSlLY6bYH4jR3ZLT8uP8AorHVjCvfTe0AS2whrm/EwHf2U2QsJG7tJJJKJcpJJJJSxIAk6DuVgW2era+z99xI+H5v/RWn1S5zKRW3T1SQ4+Q5/wA5ZSkgOq2Skkkk9CkkkklKSSSSU//V7NJJJTrFJJJJKUkkkkpSLigOyqW/ygfu9yEtfp1QZjNcWw98uJ76/R/6CbI0EgNtJJJRLlJJJJKc3q5/mR5u/gs9b91bbanMcJ3AjVYEEaHQjQjzHKkgdK7LSpJJJPQpJJJJSkkkklP/1uzSSSU6xSSUqzTgZFsEj0m+LufkxAkDdTWRKqLrv5phcP3uG/5xWnT07HqguHqOHd+o/wA36KtJpn2TwudV0kc3vn+SzQf5xWiBCdJMJJ3XUpJJJBSkkkklKVLI6ay17rGOLHu1I5bKupIgkbKcS3CyqtXM3N/eZr+H0kAGeNV0SBdiY9+r2Dd+8ND/AJwThPut4XESV27pdrdaXbx+67Q/530VTe17HbXtLHeB0TwQdkUskkkip//X7NFx8ezIs2V9tXOPACEtbpez7KNv0tx3/H/zlTSJA0WBJj4VFGoG5/77tT8v3VYSSURvqvUkkkgpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUoWVV2t22NDm+BU0klORm4JoHqVkmruDqW/+Yqougft2nfG2DuniO65/STtnbJ2zzH5sqWJPVaa6P//Z/+0bnlBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAgAAAgAAADhCSU0EJQAAAAAAEM3P+n2ox74JBXB2rq8Fw044QklNBDoAAAAAAOUAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA00AAAAGAAAAAAAAAAAAAAFNAAABegAAAAwAZABlAGYAYQB1AGwAdABfAHUAcwBlAHIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAXoAAAFNAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAFNAAAAAFJnaHRsb25nAAABegAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAABTQAAAABSZ2h0bG9uZwAAAXoAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBBEAAAAAAAEBADhCSU0EFAAAAAAABAAAAAI4QklNBAwAAAAAEpkAAAABAAAAoAAAAI0AAAHgAAEIYAAAEn0AGAAB/9j/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////7QAMQWRvYmVfQ00AAv/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAI0AoAMBIgACEQEDEQH/3QAEAAr/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/AOzSSSU6xSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkp/9Ds0kklOsUkkkkpSSSSSlJJJ2tc5wYwFzjw0clJSyU6x38O60cfpQgOyDJ/caYH9pyvV01VCK2Bg8hCYZjpqmnFZiZT/o1O+LvaP+lCI7p97GF9jmMa3klx/wDIrZQMvFbksDS4tLTLSNdeNQhxnyTTiJIl1FtD9lgifouHB/qoakWqSSSSUpJJJJSkkkklP//R7NJJJTrFJJJJKUkkkkpS1+n4opqFjh+lsEuPgOzFkHhdEmTOwTFSSSSjXKSSSSUjuprurNdglp+8HxCxb6XUWuqdrGoPiDwVvLK6sP09Z8WH8CnwOtILSSSSUi1SSSSSlJJJJKf/0uzSSSU6xSSSSSlJJJJKVzA8SF0S54AlwABJkaAT3XQqPJ0TFSSSSYuUkkkkpSy+rfz1f9U/lC1Fl9W/nqv6p/KE6HzBB2aKSSSlWqSSSSUpJJJJT//T7NJJJTrFJJJJKUkkkkps9OcRmNH7zXD/AL9/31bKwKbTTay0a7DJHlw7/orda5rmhzTLXCQfIqOY1XRZJJJJiVJJJJKUqfVDGLH7z2j/AL9/BXFmdVvDntob+Ydz/iR7fyox3CDs0EkklMtUkkkkpSSSSSn/1OzSSSU6xSSSSSlJJJJKUtjptgfiNHdktPy4/wCisdWMK99N7QBLbCGub8TAd/ZTZCwkbu0kkkolykkkklLEgCToO5WBbZ6tr7P33Ej4fm/9FafVLnMpFbdPVJDj5Dn/ADllKSA6rZKSSST0KSSSSUpJJJJT/9Xs0kklOsUkkkkpSSSSSlIuKA7Kpb/KB+73IS1+nVBmM1xbD3y4nvr9H/oJsjQSA20kklEuUkkkkpzern+ZHm7+Cz1v3VttqcxwncCNVgQRodCNCPMcqSB0rstKkkkk9CkkkklKSSSSU//W7NJJJTrFJJSrNOBkWwSPSb4u5+TECQN1NZEqouu/mmFw/e4b/nFadPTseqC4eo4d36j/ADfoq0mmfZPC51XSRze+f5LNB/nFaIEJ0kwknddSkkkkFKSSSSUpUsjprLXusY4se7Ujlsq6kiCRspxLcLKq1czc395mv4fSQAZ41XRIF2Jj36vYN37w0P8AnBOE+63hcRJXbul2t1pdvH7rtD/nfRVN7Xsdte0sd4HRPBB2RSySSSKn/9fs0XHx7MizZX21c48AIS1ul7Pso2/S3Hf8f/OVNIkDRYEmPhUUagbn/vu1Py/dVhJJRG+q9SSSSClJJJJKUkkkkpSSSSSlJJJJKUkkkkpShZVXa3bY0Ob4FTSSU5GbgmgepWSau4Opb/5iqi6B+3ad8bYO6eI7rn9JO2dsnbPMfmypYk9Vpro//9kAOEJJTQQhAAAAAABVAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAEwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAUwA2AAAAAQA4QklNBAYAAAAAAAcABQEBAAEBAP/hDLVodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9IjIxNkFGREIzRUE5RTZEMDMyRkQ3RENCQUNCRERGRkNDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMzMTY1MjFCNzM0QkUyMTFBNUI5ODdFMTdBQ0U3QTU3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IjIxNkFGREIzRUE5RTZEMDMyRkQ3RENCQUNCRERGRkNDIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcDpDcmVhdGVEYXRlPSIyMDEyLTEyLTIxVDE5OjAxOjQ0KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxMi0xMi0yMVQxOTowNDoxMiswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxMi0xMi0yMVQxOTowNDoxMiswNTozMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzMTY1MjFCNzM0QkUyMTFBNUI5ODdFMTdBQ0U3QTU3IiBzdEV2dDp3aGVuPSIyMDEyLTEyLTIxVDE5OjA0OjEyKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                $scope.$apply();
                console.log($scope.loc);

            };
            reader.readAsBinaryString(file);

        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#filePicker').change(handleFileSelect);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }


    $scope.go = function (path) {
        $location.path(path);
    };


});