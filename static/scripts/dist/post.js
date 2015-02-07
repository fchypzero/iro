define(["app","vue","superagent"],function(t,e,n){"use strict";{var o=new e({el:article,data:function(){var t=document.querySelector("#article");return{id:parseFloat(t.dataset.id),likes:parseFloat(t.dataset.likes)||0,unlikes:parseFloat(t.dataset.unlikes)||0}},methods:{like:function(){var t=this;n.post("/p/like",{id:t.id},function(e,n){if((e||200!==n.status)&&(t.likes--,e))throw e}),t.likes++},unlike:function(){var t=this;n.post("/p/unlike",{id:t.id},function(t,e){if((t||200!==e.status)&&(this.unlikes--,t))throw t}),t.unlikes++}}}),s=new e({el:"#comments",data:{comments:[],commentsInfo:{},currentPage:0,pagerMode:"simple"},computed:{simplePageButtons:function(){var t=[];this.currentPage>3&&t.push({text:"首",value:1});for(var e=this.currentPage-2;e<=this.currentPage+2;e++)if(!(1>e)){if(e>this.commentsInfo.pages)break;t.push({text:e,value:e})}return this.currentPage<this.commentsInfo.pages-2&&t.push({text:"尾",value:this.commentsInfo.pages}),t},fullPageButtons:function(){for(var t=[],e=1;e<=this.commentsInfo.pages;e++)t.push({text:e,value:e});return t}},events:{"hook:created":function(){var t=this;t.loadCommentsInfo(function(){t.commentsInfo.pages>0&&t.loadComments()})}},methods:{loadCommentsInfo:function(t){var e=this;n.get("/p/comments/"+o.id,function(n,o){if(n)throw n;e.commentsInfo=o.body,"function"==typeof t&&t()})},loadComments:function(t,e){var s=this;t=t||s.commentsInfo.pages,n.get("/p/comments/"+o.id+"/"+t,function(n,o){if(n)throw n;s.comments=o.body,s.currentPage=t,"function"==typeof e&&e()})},gotoPage:function(t){var e=this;e.loadComments(t,function(){window.scrollBy(0,e.$el.getBoundingClientRect().top)}),e.loadCommentsInfo()},togglePagerMode:function(){this.pagerMode="simple"===this.pagerMode?"full":"simple"}}});new e({el:"#form_comment_wrapper",data:{content:""},methods:{sync:function(t){this.content=t.target.innerHTML},send:function(t){var e=this,o=t.target,i=this.$el.querySelector(".textarea-content"),a={content:i.innerHTML};return a.content?(n.post(o.action,{id:e.id,content:e.content},function(t,n){if(t||200!==n.status){if(s.comments.$remove(a),i.innerHTML=e.content=a.content,t)throw t}else s.comments.$set(s.comments.indexOf(a),n.body)}),t.preventDefault(),s.comments.push(a),void(i.innerHTML=e.content="")):void t.preventDefault()}}})}});