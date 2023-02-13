/*
Exponential Ease-In and Ease-Out
source: http://www.flong.com/archive/texts/code/shapers_exp/
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
    
    float a=.25;
    float y=(1.-step(.5,a))*pow(st.x,a)+step(.5,a)*pow(st.x,1./a);
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,0.);
    vec3 fg_color=vec3(1.,1.,1.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
