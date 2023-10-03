import{q as o,s,o as a,c as i,v as l}from"./entry.23b52a28.js";var p=`
@layer primevue {
    .p-skeleton {
        overflow: hidden;
    }
    
    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
    }
    
    .p-skeleton.p-skeleton-circle {
        border-radius: 50%;
    }
    
    .p-skeleton-none::after {
        animation: none;
    }
    
    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }
}
`,d={root:{position:"relative"}},u={root:function(t){var n=t.props;return["p-skeleton p-component",{"p-skeleton-circle":n.shape==="circle","p-skeleton-none":n.animation==="none"}]}},c=o(p,{name:"skeleton",manual:!0}),h=c.load,m={name:"BaseSkeleton",extends:s,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},css:{classes:u,inlineStyles:d,loadStyle:h},provide:function(){return{$parentInstance:this}}},f={name:"Skeleton",extends:m,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}}}};function y(e,t,n,k,S,r){return a(),i("div",l({class:e.cx("root"),style:[e.sx("root"),r.containerStyle],"aria-hidden":"true"},e.ptm("root"),{"data-pc-name":"skeleton"}),null,16)}f.render=y;export{f as s};
