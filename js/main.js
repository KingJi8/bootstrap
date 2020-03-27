$(function(){
    var winW = $(window).width();
    var winH = $(window).height();
    $('[data-toggle="tooltip"]').tooltip();

    //gnb 밑줄 액션
    $('.hgnbLink').on('mouseenter', function(){
        $(this).find('.gnb-on').stop().animate({width:'100%'},300)
    })
    $('.hgnbLink').on('mouseleave', function(){
        $(this).find('.gnb-off').stop().animate({width:'100%'},300)
        $(this).find('.gnb-on').delay(300).animate({width:'0%'},0)
        $(this).find('.gnb-off').delay(300).animate({width:'0%'},0)
    })

    //top 섹션 높이 = 윈도우 사이즈에 맞춰 조절
    function topSecH() {
        var headerH = $('.header').outerHeight();
        $('.topSec').outerHeight(winH);
        $('.topSec').css({'padding-top':headerH});
    }
    topSecH();

    //top 섹션 이미지 사이즈 = 윈도우 사이즈 맞춰 조절
    function tsProfileRect() {
        var $profileImgbox = $('.profileImgbox'),
            proImgboxW = $profileImgbox.width();
        var $profileRect = $('.profileRect'),
            proRectW = $profileRect.width();

        $profileImgbox.height(proImgboxW);
        $profileRect.height(proRectW);
    }
    tsProfileRect();

    //top 섹션에서 스크롤 내릴 때 자동 이동
    function topScroll() {
        var portfolioTop = $('.portfolioSec').offset().top;      
        $('.topSec').on('DOMMouseScroll mousewheel', function(e){
            var moveTop = null;
            var winS = $(window).scrollTop();
            console.log(winS);
            
            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){
                if(winS<=portfolioTop) {
                    moveTop = 0;
                }
            }else{
                if(winS<portfolioTop) {
                    moveTop = portfolioTop - 100;
                }
            };
            $('html,body').stop().animate({scrollTop:moveTop},500)
        });
    }
    topScroll();

    //포트폴리오 이미지 사이즈 = 윈도우 사이즈 맞춰 조절
    function psConHeight() {
        var $psConImg = $('.psConImg');
        var psConImgW = $psConImg.width();
        
        $psConImg.height(psConImgW*1.273);
    }
    psConHeight();

    //포트폴리오 이미지 내 로고 사이즈 = 윈도우 사이즈 맞춰 조절
    function psImgCirHeight() {
        var $psImgCir = $('.psImgCir');
        var psImgCirW = $psImgCir.width();

        $psImgCir.height(psImgCirW);
        $psImgCir.width(psImgCirW)
    }
    psImgCirHeight();

    //포트폴리오 사이트 이동 Btn 액션
    function moveBtn() {
        $('.psTxtLinkBox').animate({left:'20px'},500).animate({left:'0px'},500);
    }
    var portAni = null;
    $('.psTxtLinkBox').on('mouseenter',function(){
        moveBtn();
        portAni = setInterval(moveBtn,1000);
    }).on('mouseleave',function(){
        clearInterval(portAni);
    });

    //study 이미지 정사각형
    var $stImg = $('.stsImgbox');
    var stImgW = $stImg.width();
    function stImgH(){
        $stImg.height(stImgW);
    }
    stImgH();

    /*ability 막대 액션*/
    var pVal = [];
    var pValTxt = [];

    $('.abAbility').each(function(i){
        pVal[i] = $(".abAbility").eq(i);
        pValTxt[i] = pVal[i].find(".abProVal").text();

        prog();

        function prog(){
            var count = 0;
            var count1 = 0;

            $(window).scroll(function(){
                var winS=$(window).scrollTop();
                var abTop=$('#ability').offset().top;
                
                if(winS>=abTop-winH+200) {
                    var pmove = setInterval(pPBar,10);
                    function pPBar(){
                        if(count1>=pValTxt[i]){
                            clearInterval(pPBar);
                        }else {
                            count1 ++;
                            pVal[i].find('.abProBar').stop().animate({width:count1+'%'},10);
                        };
                    }
                    
                    var pcount = setInterval(pProgress,10);
                    function pProgress(){
                        if(count>=pValTxt[i]){
                            clearInterval(pcount);
                        }else {
                            count ++;
                            pVal[i].find('.abProVal').text(count+'%');
                        };
                    };
                };
            });
        };
    })

    //ability more 버튼 작동
    function amBtnAct(){
        $('.abBtnBox').animate({right:'80px'},500).animate({right:'100px'},500);
    };
    var abAct = null;
    $('.abBtnBox').on('mouseenter',function(){
        amBtnAct();
        abAct = setInterval(amBtnAct(),1000);
    }).on('mouseleave',function(){
        clearInterval(abAct);
    })

    $(window).resize(function(){
        winH = $(window).height();
        topSecH();
        tsProfileRect();
        psConHeight();
        psImgCirHeight();
        stImgH();
    });
});