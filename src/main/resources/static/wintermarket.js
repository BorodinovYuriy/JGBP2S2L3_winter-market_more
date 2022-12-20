angular.module('app',[]).controller('indexController', function($scope, $http){

    console.log("test console.log: wintermarket.js - is working!")

    const contextPath = 'http://localhost:8189/winter/api/v1';
    $scope.pageNumber = 1;

//Получение списка продуктов
$scope.loadProducts = function() {
                $http({
                    url: contextPath +'/products',
                    method: 'GET',
                    params: {
                             p: $scope.pageNumber,
                             min_price: $scope.filter ? $scope.filter.min_price : null,
                             max_price: $scope.filter ? $scope.filter.max_price : null,
                             title_part: $scope.filter ? $scope.filter.title_part : null
                    }
                }).then(function(response) {
                                  $scope.productList = response.data.content;
                })
}
//Пагинация
$scope.change_page = function(pageVar) {
             $scope.pageNumber = $scope.pageNumber + pageVar;
             if($scope.pageNumber <= 0){
                    $scope.pageNumber = 1
             }
             $http({
                    url: contextPath +'/products',
                    method: 'GET',
                    params: {
                             p: $scope.pageNumber,
                             min_price: $scope.filter ? $scope.filter.min_price : null,
                             max_price: $scope.filter ? $scope.filter.max_price : null,
                             title_part: $scope.filter ? $scope.filter.title_part : null
                    }
             }).then(function(response) {
                     $scope.productList = response.data.content;
             })
}
//Информация о продукте
$scope.showProductInfo = function(productId){
    $http.get(contextPath + '/products/'+productId)
            .then(function(response){
            alert(response.data.title);
    })
}
//Удаление
$scope.deleteProductById = function(id){
            $http.delete(contextPath + '/products/' + id)
            .then(function(response) {
                $scope.loadProducts();
            })
}
//Добавить в корзину
$scope.addToCart = function(productId){
    $http.get(contextPath + '/cart/add/' + productId).then(function(response){
    $scope.loadCart();
    })
}
//Отображение корзины
$scope.loadCart = function(){
    $http.get(contextPath + '/cart').then(function(response){
    $scope.cart = response.data;
    })
}
//Удаление из корзины
$scope.deleteFromCart = function(productId){
    $http.delete(contextPath + '/cart/'+ productId).then(function(response){
    $scope.loadCart();
    })
}
//Очистить корзину
$scope.clearCart = function(productId){
    $http.delete(contextPath + '/cart').then(function(response){
    $scope.loadCart();
    })
}
//Количество в корзине
$scope.changeQuantity = function(productId, number){
    if(number < 0){
            $http.put(contextPath + '/cart/decrease/' + productId)
            .then(function(response){
                $scope.loadCart();
            })
    }
    if(number > 0){
            $http.put(contextPath + '/cart/increase/' + productId)
            .then(function(response){
                $scope.loadCart();
            })
    }

}



$scope.loadProducts();
$scope.loadCart();

});

