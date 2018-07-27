var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};


    // when landing on the page, get all userTypes and show them
    $http.get('/rest/userTypes')

        .success(function(data) {
            $scope.userTypes = data;

            console.log('\nInside code data : '+JSON.stringify(data) + '\n');
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/userTypes', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.userTypes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a userType after checking it
    $scope.deleteUserType = function(id) {
        $http.delete('/rest/userTypes/' + id)
        //After delete, get al list of all of the usertypes again and return the list as the success data
            .success(function() {
                $http.get('/rest/userTypes')
                    .success(function(data) {
                        $scope.userTypes = data;
                        console.log('\nInside code data : '+JSON.stringify(data) + '\n');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}