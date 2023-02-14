/*
Logistic Sigmoid
source: http://www.flong.com/archive/texts/code/shapers_exp/

The so-called "Logistic Curve" is an elegant sigmoidal function
which is believed by many scientists to best represent the growth
of organic populations and many other natural phenomena. In software
engineering, it is often used for weighting signal-response functions
in neural networks. In this implementation, the parameter a regulates
the slope or "growth rate" of the sigmoid during its rising portion.
When a=0, this version of the Logistic function collapses to the Identity
Function (y=x). The Logistic Sigmoid has very natural rates of change, but
is expensive to calculate due to the use of many exponential functions.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float y){
    return smoothstep(y-.009,y,st.y)-smoothstep(y,y+.009,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float a=.787;
    a=(1./(1.-a)-1.);
    float numerator=(1./(1.+exp(-2.*a*(st.x-.5))))-(1./(1.+exp(a)));
    float denominator=(1./(1.+exp(-a)))-(1./(1.+exp(a)));
    float y=numerator/denominator;
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,0.);
    vec3 fg_color=vec3(1.,1.,1.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
