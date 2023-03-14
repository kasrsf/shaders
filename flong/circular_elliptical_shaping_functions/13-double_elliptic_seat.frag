/*
Double-Elliptic Seat
source: http://www.flong.com/archive/texts/code/shapers_circ/

This seat-shaped function is created by the joining of two elliptical arcs, and is a generalization of the Double-Circle Seat. The two arcs meet at the coordinate (a,b) with a horizontal tangent.
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

float f(float x,float a,float b){
    float epsilon=.00001;
    float min_param_a=0.+epsilon;
    float max_param_a=1.-epsilon;
    float min_param_b=0.;
    float max_param_b=1.;
    a=max(min_param_a,min(max_param_a,a));
    b=max(min_param_b,min(max_param_b,b));
    
    float y=0.;
    if(x<=a){
        y=(b/a)*sqrt(pow(a,2.)-pow(x-a,2.));
    }else{
        y=1.-((1.-b)/(1.-a))*sqrt(pow(1.-a,2.)-pow(x-a,2.));
    }
    return y;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float y=f(st.x,.6,.3);
    
    float plt=plot(st,y);
    
    vec3 color=vec3(y);
    vec3 fg_color=vec3(0.,1.,0.);
    color=(1.-plt)*color+plt*fg_color;
    
    gl_FragColor=vec4(color,1.);
}
