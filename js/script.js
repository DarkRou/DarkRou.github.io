window.onload = function () {
    preloader.classList.add('hide');
    setTimeout(function () {
        preloader.remove();
    }, 500);
};

var blocks = document.querySelectorAll('.block');

var firstBlock = document.querySelector('.content > .block');
var lastBlock = document.querySelector('.content > .block:nth-last-child(3)');

var timer = null;

function removeList(categoryLogo, itemsList){
    categoryLogo.classList.add('noTransitions');
    itemsList.classList.add('noTransitions');

    setTimeout(function () {

        categoryLogo.classList.remove('scaleBlock');

        itemsList.classList.remove('defaultTranslate');

        categoryLogo.style.minWidth = '600px';
        itemsList.style.minWidth = '600px';
        itemsList.style.minWidth = '600px';
        itemsList.style.maxWidth = '600px';

        itemsList.classList.add('hidden');

        setTimeout(function () {
            categoryLogo.classList.remove('noTransitions');
            itemsList.classList.remove('noTransitions');
        }, 100);
    }, 500);
}
function removeActiveBlock(activeBlock, categoryLogo, itemsList, fullImgPhoto, fullImgArt){
    activeBlock.classList.add('fadeOut');
    setTimeout(function () {
        activeBlock.classList.remove('fadeOut');
        activeBlock.classList.remove('active');
        activeBlock.classList.toggle('displayNone');

        if (categoryLogo.style.visibility == 'hidden'){
            categoryLogo.style.visibility = 'visible';
            itemsList.classList.add('zTranslate');
        }

        if(fullImgPhoto.classList.contains('imgVisible')){
            fullImgPhoto.classList.remove('imgVisible')
        }
        if(fullImgArt.classList.contains('imgVisible')){
            fullImgArt.classList.remove('imgVisible')
        }

        timer = false;
    }, 500);
}
function revealBLock(neededBlock, loopBlock){
    if (neededBlock.classList.contains('block')) {
        neededBlock.classList.add('active', 'fadeIn');
        neededBlock.classList.toggle('displayNone');
        setTimeout(function () {
            neededBlock.classList.remove('fadeIn');
        }, 500);
    }
    else {
        loopBlock.classList.add('active', 'fadeIn');
        loopBlock.classList.toggle('displayNone');
        setTimeout(function () {
            loopBlock.classList.remove('fadeIn');
        }, 500);
    }
}

next.addEventListener('click', function() {
    if (timer){
        return;
    }
    timer = true;

    var activeBlock = document.querySelector('.content > .block.active');
    var nextBlock = activeBlock.nextElementSibling;

    var categoryLogo = activeBlock.querySelector('.categoryLogo');
    var itemsList = activeBlock.querySelector('.list');

    var fullImgPhoto = photo.querySelector('#photo .scrollWrapper > .fullImg');
    var fullImgArt = art.querySelector('#art .scrollWrapper > .fullImg');

    if (categoryLogo.classList.contains('scaleBlock')){
        removeList(categoryLogo, itemsList);
    }

    revealBLock(nextBlock, firstBlock);

    removeActiveBlock(activeBlock, categoryLogo, itemsList, fullImgPhoto, fullImgArt);
});
prev.addEventListener('click', function() {
    if (timer){
        return;
    }
    timer = true;

    var activeBlock = document.querySelector('.content > .block.active');
    var prevBlock = activeBlock.previousElementSibling;

    var categoryLogo = activeBlock.querySelector('.categoryLogo');
    var itemsList = activeBlock.querySelector('.list');

    var fullImgPhoto = photo.querySelector('#photo .scrollWrapper > .fullImg');
    var fullImgArt = art.querySelector('#art .scrollWrapper > .fullImg');

    if (categoryLogo.classList.contains('scaleBlock')){
        removeList(categoryLogo, itemsList);
    }

    revealBLock(prevBlock, lastBlock);

    removeActiveBlock(activeBlock, categoryLogo, itemsList, fullImgPhoto, fullImgArt);
});

blocks.forEach(function (elem) {
    var categoryLogo = elem.querySelector('.categoryLogo');
    var itemsList = elem.querySelector('.list');

    var fullImgPhoto = photo.querySelector('#photo .scrollWrapper > .fullImg');
    var fullImgArt = art.querySelector('#art .scrollWrapper > .fullImg');

    var adaptiveHideButton = elem.querySelector('#hide');

    categoryLogo.addEventListener('click', function () {
        if (timer){
            return;
        }

        timer = true;

        if (window.innerWidth > 1125){
            categoryLogo.classList.toggle('scaleBlock');
            itemsList.classList.toggle('defaultTranslate');
        }
        else if(window.innerWidth < 1125){
            categoryLogo.classList.toggle('scaleBlock');
            itemsList.classList.toggle('zTranslate');
            setTimeout(function () {
                categoryLogo.style.visibility = 'hidden';
            },250)
        }
        if (window.innerWidth < 500){
            var arrows = document.querySelectorAll('.arrow');
            arrows.forEach(function (elem) {
                if (elem.style.visibility = 'visible'){
                    elem.style.opacity = 0;
                    setTimeout(function () {
                        elem.style.visibility = 'hidden'
                    }, 250)
                }
                else{
                    elem.style.visibility = 'visible';
                    elem.style.opacity = '1';
                }
            })
        }

        if (itemsList.style.minWidth == '480px'){
            setTimeout(function () {
                categoryLogo.style.minWidth = '600px';
                itemsList.style.maxWidth = '600px';
                categoryLogo.style.maxWidth = '600px';
                itemsList.style.minWidth = '600px';
            }, 250);
        }
        else {
            categoryLogo.style.minWidth = '480px';
            itemsList.style.maxWidth = '480px';
            categoryLogo.style.maxWidth = '480px';
            itemsList.style.minWidth = '480px';
        }

        if (itemsList.classList.contains('hidden')){
            itemsList.classList.remove('hidden');
            itemsList.style.opacity = '1';

            setTimeout(function () {
                itemsList.style.opacity = null;

                timer = false;
            }, 250);
        }
        else if (!itemsList.classList.contains('hidden')){
            itemsList.style.opacity = '0';

            setTimeout(function () {
                itemsList.classList.add('hidden');
                itemsList.style.opacity = null;

                if(fullImgPhoto.classList.contains('imgVisible')){
                    fullImgPhoto.classList.remove('imgVisible')
                }
                if(fullImgArt.classList.contains('imgVisible')){
                    fullImgArt.classList.remove('imgVisible')
                }

                timer = false;
            }, 250);
        }
    });
    adaptiveHideButton.addEventListener('click', function () {
        if (timer){
            return;
        }

        timer = true;

        categoryLogo.classList.toggle('scaleBlock');
        itemsList.classList.toggle('zTranslate');
        categoryLogo.style.visibility = 'visible';
        if (itemsList.classList.contains('defaultTranslate')){
            itemsList.classList.remove('defaultTranslate');
        }

        setTimeout(function () {
            categoryLogo.style.minWidth = '600px';
            itemsList.style.maxWidth = '600px';
            categoryLogo.style.maxWidth = '600px';
            itemsList.style.minWidth = '600px';
        }, 250);

        itemsList.style.opacity = '0';

        setTimeout(function () {
            itemsList.classList.add('hidden');
            itemsList.style.opacity = null;

            if(fullImgPhoto.classList.contains('imgVisible')){
                fullImgPhoto.classList.remove('imgVisible')
            }
            if(fullImgArt.classList.contains('imgVisible')){
                fullImgArt.classList.remove('imgVisible')
            }

            timer = false;
        }, 250);
        if (window.innerWidth < 500){
            var arrows = document.querySelectorAll('.arrow');
            arrows.forEach(function (elem) {
                    elem.style.visibility = 'visible';
                    elem.style.opacity = '1';
            })
        }
    });
    window.addEventListener('resize', function () {
        if (itemsList.classList.contains('zTranslate') && itemsList.classList.contains('defaultTranslate') && categoryLogo.classList.contains('scaleBlock')){
            itemsList.classList.remove('zTranslate');
        }
        if (window.innerWidth > 1125){
            if (categoryLogo.style.visibility == 'hidden'){
                categoryLogo.style.visibility = 'visible';
                itemsList.classList.add('zTranslate', 'defaultTranslate');
            }
        }
        if (window.innerWidth < 1125){
            if (!itemsList.classList.contains('zTranslate') && itemsList.classList.contains('hidden') && categoryLogo.style.visibility == 'visible'){
                itemsList.classList.add('zTranslate');
            }
            else if (itemsList.classList.contains('zTranslate') && !itemsList.classList.contains('hidden') && categoryLogo.style.visibility == 'visible'){
                categoryLogo.style.visibility = 'hidden';
                itemsList.classList.remove('zTranslate', 'defaultTranslate');
            }
        }
        var arrows = document.querySelectorAll('.arrow');
        if (window.innerWidth > 500){
            arrows.forEach(function (elem) {
                if (elem.style.visibility = 'hidden'){
                    elem.style.visibility = 'visible';
                    elem.style.opacity = '1';
                }
            })
        }
        else {
            arrows.forEach(function (elem) {
                if (!itemsList.classList.contains('hidden')){
                    elem.style.opacity = '0';
                    setTimeout(function () {
                        elem.style.visibility = 'visible';
                    }, 250);
                }
            })
        }
    });
});

function toggleFullImg(elem, fullImg, img){
    elem.addEventListener('click', function () {
        if (timer){
            return;
        }
        timer = true;

        fullImg.append(img);
        fullImg.classList.add('imgVisible');
        setTimeout(function () {
            timer = false;
        }, 250)
    });
    fullImg.addEventListener('click', function () {
        if (timer){
            return;
        }
        timer = true;

        fullImg.style.opacity = 0;
        setTimeout(function () {
            fullImg.classList.remove('imgVisible');
            fullImg.style = null;
            fullImg.lastElementChild.remove();
            timer = false;
        }, 250);
    });
}

photo.querySelectorAll('#photo .gallery .item').forEach(function (elem) {
    var fullImg = photo.querySelector('#photo .scrollWrapper > .fullImg');
    var img = elem.querySelector('img').cloneNode(true);

    toggleFullImg(elem, fullImg, img);
});
art.querySelectorAll('#art .gallery .item').forEach(function (elem) {
    var fullImg = art.querySelector('#art .scrollWrapper > .fullImg');
    var img = elem.querySelector('img').cloneNode(true);

    toggleFullImg(elem, fullImg, img);
});

art.querySelector('.gallery .exactItemWrapper:last-child').style.paddingBottom = '2px';
photo.querySelector('.gallery .exactItemWrapper:last-child').style.paddingBottom = '2px';

var items = document.querySelectorAll('.item');
items.forEach(function (elem) {
    var img = elem.querySelector('img');
    elem.addEventListener('mousemove', function (e) {
        var halfSize = img.offsetHeight/2;
        img.style.transform = 'rotateX('+-(e.offsetY - halfSize) / 8+'deg) rotateY('+(e.offsetX - halfSize) / 8+'deg)';
        img.style.transition = null;
    });
    elem.addEventListener('mouseout', function () {
        img.style.transform = 'rotate(0)';
        img.style.transition = 'transform 0.1s';
    })
});

var options = document.querySelectorAll('.option');
var answers = document.querySelector('.answers');
var sayHello = document.querySelector('.sayHello');
var socials = document.querySelector('#socialsList');

function dotsAnimation(dots) {
    setTimeout(function () {
        dots.style.transform = null;
    }, 0);
    writingAnimation = setInterval(function() {
        dots.innerHTML = dots.innerHTML + '.';
        if (dots.innerHTML.length > 3){
            dots.innerHTML = '.';
        }
    }, 300);
}

function appendAnswer(text, message, next, showAll = false){
    if (typeof text == 'string'){
        var answer = document.createElement('div');
        answer.className = 'answer darkrou';
        answer.innerHTML = text;
        answer.style.transform = 'scale(0)';
    }
    else {
        var answer = text;
        answer.style.transform = 'scale(0)';
    }

    var dots = document.createElement('div');
    dots.className = 'answer dots';
    dots.innerHTML = '.';
    dots.style.transform = 'scale(0)';

    var messageText = message.cloneNode(true);
    messageText.className = 'answer me';
    messageText.style.transform = 'scale(0)';

    var readingTime = message.innerHTML.length * 20;
    if (message.innerHTML == 'Привет'){
        readingTime = 500;
    }

    var textArea = document.querySelector('.textArea p');
    var typing = message.innerHTML;

    textArea.style.color = '#0e8691';
    textArea.innerHTML = typing.substr(0, 1);

    var letterNumber = 2;
    var letterTyping = setInterval(function () {
        textArea.innerHTML = typing.substr(0, letterNumber);
        ++letterNumber;
    }, 100);

    setTimeout(function () {
        clearInterval(letterTyping);
        setTimeout(function () {
            textArea.style.color = null;
            textArea.innerHTML = 'Выберите ответ...';
        }, 100);
    }, typing.length * 100 + 200);

    setTimeout(function () {
        answers.prepend(messageText);
        setTimeout(function () {
            messageText.style.transform = null;
        }, 0);
        message.parentElement.style.opacity = '0';
        if (next != 'Do not reveal'){
            setTimeout(function () {
                message.parentElement.style.display = 'none';
            }, 300);
        }
        setTimeout(function () {
            answers.prepend(dots);
            dotsAnimation(dots);

            if (typeof text == 'string'){
                var writingTime = text.length * 30;
            }
            else {
                var writingTime = text.children.length * 300;
            }
            setTimeout(function () {
                clearInterval(writingAnimation);
                dots.remove();
                answers.prepend(answer);
                if (next == 'Do not reveal'){
                    var optionsBlock = document.querySelector('.answerOptions');
                    setTimeout(function () {
                        answer.style.transform = null;
                        if (showAll){
                            setTimeout(function () {
                                var socialsList = socials.querySelectorAll('.socials');
                                var index = 0;
                                function appendSocials(){
                                    dots.style.transform = 'scale(0)';
                                    setTimeout(function () {
                                        answers.prepend(dots);
                                        dotsAnimation(dots);
                                        switch (socialsList[index].id) {
                                            case 'siteSocial':
                                                var categoryName = 'Сайты';
                                                break;
                                            case 'photoSocial':
                                                var categoryName = 'Фото';
                                                break;
                                            case 'artSocial':
                                                var categoryName = 'Арты';
                                                break;
                                        }
                                        var nextAnswer = answer.cloneNode(true);
                                        nextAnswer.innerHTML = categoryName;
                                        nextAnswer.style.transform = 'scale(0)';
                                        writingTime = categoryName.length * 100;
                                        setTimeout(function () {
                                            clearInterval(writingAnimation);
                                            dots.remove();
                                            answers.prepend(nextAnswer);
                                            setTimeout(function () {
                                                nextAnswer.style.transform = null;
                                            }, 0);
                                            dots.style.transform = 'scale(0)';
                                            setTimeout(function () {
                                                answers.prepend(dots);
                                                dotsAnimation(dots);
                                                writingTime = socialsList.length * 300;
                                                socialsList[index].style.transform = 'scale(0)';
                                                setTimeout(function () {
                                                    clearInterval(writingAnimation);
                                                    dots.remove();
                                                    answers.prepend(socialsList[index]);
                                                    setTimeout(function () {
                                                        socialsList[index].style.transform = null;
                                                        index++;
                                                        if (index < socialsList.length){
                                                            setTimeout(appendSocials, 250);
                                                        }
                                                    }, 0);
                                                }, writingTime)
                                            }, 100)
                                        }, writingTime)
                                    }, 0)
                                }
                                appendSocials();
                            }, 500);
                        }
                        timer = false;
                        if (message.parentElement.id == 'greeting'){
                            optionsBlock.style.minHeight = '0';
                            optionsBlock.style.height = '0';
                            optionsBlock.style.transform = 'scaleY(0)';
                            setTimeout(function () {
                                optionsBlock.style.visibility = 'hidden';
                                timer = false;
                            }, 300);
                            return;
                        }
                        else if(message.parentElement.id == 'choose'){
                            var separatedWithDisplayNone = 0;
                            var separatedBlocks = document.querySelectorAll('#choose #separated');
                            separatedBlocks.forEach(function (elem) {
                                if (elem.style.display == 'none'){
                                    separatedWithDisplayNone++;
                                }
                            });
                            if (message.id != 'all'){
                                all.style.display = 'none';
                            }
                            else{
                                optionsBlock.style.minHeight = '0';
                                optionsBlock.style.height = '0';
                                optionsBlock.style.transform = 'scaleY(0)';
                                setTimeout(function () {
                                    optionsBlock.style.visibility = 'hidden';
                                    timer = false;
                                }, 300);
                            }
                            if (separatedWithDisplayNone != 2){
                                message.style.display = 'none';
                                message.parentElement.style.opacity = '1';
                            }
                            else {
                                optionsBlock.style.minHeight = '0';
                                optionsBlock.style.height = '0';
                                optionsBlock.style.transform = 'scaleY(0)';
                                setTimeout(function () {
                                    optionsBlock.style.visibility = 'hidden';
                                    timer = false;
                                }, 300);
                            }
                            timer = false;
                        }
                        else{
                            timer = false;
                        }
                    }, 0);
                }
                else{
                    next.style.display = 'flex';
                    next.style.opacity = '0';
                    setTimeout(function () {
                        answers.querySelector('.darkrou').style.transform = null;
                        next.style.opacity = '1';
                        timer = false;
                    }, 0);
                }
            }, writingTime);
        }, readingTime);
    }, typing.length * 100 + 300);
}
options.forEach(function (elem) {
    elem.addEventListener('click', function () {
        if (timer){
            return;
        }
        timer = true;

        if (sayHello.style.opacity == '1'){
            sayHello.style.opacity = '0';
        }

        var text;
        var revealNext;
        var all;
        switch (elem.innerHTML) {
            case 'Привет':
                text = 'О, новый посетитель! Меня DarkRou звать, рад знакомству';
                revealNext = document.getElementById('yourHobby');
                break;
            case 'Привет. Дай ссылки на все твои соц. сети':
                text = 'С места сразу в карьер? Ну ладно, вот';
                all = true;
                revealNext = 'Do not reveal';
                break;

            case 'А чем ты занимаешься?':
            case 'Напомни, чем ты занимаешься?':
                text = 'Пишу сайты, фотографирую, рисую';
                revealNext = document.getElementById('findYourWorks');
                break;

            case 'А где можно найти твои работы?':
            case 'Можешь ещё раз показать, где найти твои работы?':
                text = 'Здесь же, на сайте. Также меня можно найти на разных ресурсах. Что интересует?';
                revealNext = document.getElementById('choose');
                break;

            case 'Сайты':
                text = socials.querySelector('#siteSocial');
                revealNext = 'Do not reveal';
                break;

            case 'Фото':
                text = socials.querySelector('#photoSocial');
                revealNext = 'Do not reveal';
                break;

            case 'Арты':
                text = socials.querySelector('#artSocial');
                revealNext = 'Do not reveal';
                break;

            case 'Дай ссылки на все соц. сети':
            case 'А дай ссылки на все соц. сети':
                text = 'Вот';
                all = true;
                revealNext = 'Do not reveal';
                break;
        }
        appendAnswer(text, elem, revealNext, all);
    })
});