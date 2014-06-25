var dump = [
    {//0
        q: 'Есть ли у вас или у вашей компании свой сайт',
        a: [{
                lable: 'Да',
                next: 1
            },
            {
                lable: 'Нет',
                next: 'http://ya.ru'
            }]
    },
    {//1
        q: 'Он приводит вам новых клиентов',
        a: [{
                lable: 'Да, достаточно',
                next: 2
            },
            {
                lable: 'Нет (или хотелось бы больше)',
                next: 3
            }]
    },
    {//2
        q: 'На данном этапе вам не требуется\
            ничего улучшать. Читайте наш блог\
            и будьте в курсе всех последних новостей в сфере маркетинга и seo {{ССЫЛКА}}'
    },
    {//3
        q: 'По каким рекламным каналам приходят клиенты на ваш сайт?',
        a: [{
                lable: 'Из поиска Яндекс',
                next: 'http://ya.ru'
            },
            {
                lable: 'Контекстная реклама',
                next: 'http://google.com'
            },
            {
                lable: 'Незнаю (или вообще не приходят)',
                next: 'http://rambler.ru'
            }]
    }
];

jQuery(function() {
    var question = jQuery('.question'),
        answer = jQuery('.answer'),
        answers = jQuery('.answers');
    
    question.html(dump[0].q);
    answer.eq(0).html(dump[0].a[0].lable);
    answer.eq(0).data('next', dump[0].a[0].next);
    answer.eq(1).html(dump[0].a[1].lable);
    answer.eq(1).data('next', dump[0].a[1].next);
    
    jQuery('body').on('click', '.answer',  function(e){
        var el = e.currentTarget;
            next = jQuery(el).data('next');
        if(!(/http:/.test(next))){
            e.preventDefault();

            answers.stop().fadeOut(250);
            question.stop().fadeOut(250, function(){
                question.html(dump[next].q);
                
                jQuery('.answers').html('');
                if(dump[next].a){
                    jQuery.each(dump[next].a, function(key, ans){
                        var appenedAnswer = jQuery('<a>', {
                            class:'answer',
                            href: ans.next
                        });
            
                        appenedAnswer.html(ans.lable);
                        appenedAnswer.data('next', ans.next);
                        jQuery('.answers').append(appenedAnswer);
                    });
                }
                question.stop().fadeIn(250);
                answers.stop().fadeIn(250);
            });

        }
    })
});
