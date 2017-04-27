


var app = angular.module('dw4', [
  'ng-backstretch',
  'ngBox',
  'tooltipster',
  'duScroll',
  'slickCarousel',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){


  $stateProvider
    .state('inicio', {
      url: '/inicio'
    })
    .state('signos', {
      url: '/signos',
      templateUrl: 'app/view/signos.html'
    })
    .state('pintura', {
      url: '/pintura',
      templateUrl: 'app/view/pintura.html'
    })
    .state('electrico', {
      url: '/electrico',
      templateUrl: 'app/view/electrico.html'
    })
    .state('galeria', {
      url: '/galeria',
      templateUrl: 'app/view/galeria.html'
    })
    .state('acerca-de-nosotros', {
      url: '/acerca-de-nosotros',
      templateUrl: 'app/view/acerca-de-nosotros.html'
    })
    .state('contacto', {
      url: '/contacto',
      templateUrl: 'app/view/contacto.html'
    });

    $urlRouterProvider.otherwise('/inicio');

    //$locationProvider.html5Mode(true).hashPrefix('!')




});


app.run(function($rootScope, $document, $state){
  $rootScope.$on('$stateChangeStart', function(event, toState){

    $document.scrollTop(0, 500);
    setTimeout(function(){
      if($('.main h2').length>0 || ('.main h3').length>0 || ('.main h4').length>0){
        window.sr = ScrollReveal({ reset: true });
        sr.reveal('.main h2');
        sr.reveal('.main h3');
        sr.reveal('.main h4')
        sr.reveal('.main p');
        sr.reveal('.main ul');
        sr.reveal('.subtitle .left', {origin:'left', distance: '200px', duration: 1000});
        sr.reveal('.subtitle .right', {origin:'right', distance: '200px', duration: 1000});
        sr.reveal('.ourclients .c');
      }
    }, 1000);
    
    $('.mainmenubtn').removeClass('active');
    $('.mainmenuview').hide();




  });




  $('.mainmenubtn').click(function(){
    $(this).toggleClass('active');
    $('.mainmenuview').toggle();
  });





});


app.controller('MainCtrl', function($scope, $state, $rootScope, $document){
  $scope.toState;
  $scope.scrollToTop = $rootScope.scrollToTop;


  $scope.$on('$stateChangeStart', function(event, toState){
    $scope.toState = toState.name;
  });

  $document.on('scroll', function() {
    if($document.scrollTop() > 800 && !$('.backToTopBtn').is('.active')){
      $('.backToTopBtn').addClass('active');
    } else if($document.scrollTop()<800 && $('.backToTopBtn').is('.active')) {
      $('.backToTopBtn').removeClass('active');
    }
  });

  //GotToTop
  $scope.goUp = function(){ $document.scrollTopAnimated(0); }


});




app.controller('FormCtrl', function($scope, $http){
  $scope.sent = false;
  $scope.submitForm = function(e){
    //console.log(e.target);
    var datos = $(e.target).serialize();
    $scope.form = {};
    $http({
      method: 'GET',
      url: 'http://www.dragonbarbudo.com/api/email.php?'+datos
    }).then(function(result){
      //console.log('http://www.dragonbarbudo.com/api/email.php?'+datos);
      if(result.data=="1"){
        //console.log('done');
        $scope.sent = true;
      }
    });

  }
});



app.directive('scrollable', ['$document', '$window', function ($document, $window ) {
return {
    link: function (scope, element, attrs) {
        $document.bind('scroll', function() {
          $('.logo').addClass('scrolling');
            clearTimeout( $.data( this, "scrollCheck" ) );
                $.data( this, "scrollCheck", setTimeout(function() {
                    $('.logo').removeClass('scrolling');
                }, 50) );
        });
    }
};
}]);





/* OTHER CODES */
/* http://embed.plnkr.co/UAELQkmh18RVDn1cOAaW/ */
angular.module("tooltipster",[]).directive('tooltip', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).tooltipster({
          animation: attrs.animation
        });
      }
    };
  });

/* NgBox */
angular.module("ngBox",[]).directive("ngBox",["$timeout",function(a){return{restrict:"C",scope:{useCss:"=",useSvg:"=",initialIndexOnArray:"=",removeBarsOnMobile:"=",hideCloseButtonOnMobile:"=",hideBarsDelay:"=",videoMaxWidth:"=",vimeoColor:"=",loopAtEnd:"=",autoplayVideos:"=",queryStringData:"=",toggleClassOnLoad:"=",beforeOpen:"&beforeOpen",afterOpen:"&afterOpen",afterClose:"&afterClose",nextSlide:"&nextSlide",prevSlide:"&prevSlide"},link:function(b){var c;return t={useCSS:b.useCss,useSVG:b.useSvg,initialIndexOnArray:b.initialIndexOnArray||0,removeBarsOnMobile:b.removeBarsOnMobile,hideCloseButtonOnMobile:b.hideCloseButtonOnMobile||!1,hideBarsDelay:b.hideBarsDelay||3e3,videoMaxWidth:b.videoMaxWidth||1140,vimeoColor:b.vimeoColor||"cccccc",loopAtEnd:b.loopAtEnd||!1,autoplayVideos:b.autoplayVideos||!1,queryStringData:b.queryStringData||{},toggleClassOnLoad:b.toggleClassOnLoad||"",beforeOpen:b.beforeOpen||function(){},afterOpen:b.afterOpen||null,afterClose:b.afterClose||function(){},nextSlide:b.nextSlide||null,prevSlide:b.prevSlide||null},a(function(){angular.element(".ng-box").swipebox(c)})}}}]);
