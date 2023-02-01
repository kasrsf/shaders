/*
Quadratic Through a Given Point
source: http://www.flong.com/archive/texts/code/shapers_poly/

This function defines an axis-aligned quadratic (parabola) which
passes through a user-supplied point (a,b) in the unit square
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
    float b=.45;
    float y=((1.-b)/(1.-a)-(b/a))*pow(st.x,2.)-(pow(a,2.)*((((1.-b)/(1.-a)))-b/a)-b)/a*st.x;
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,1.);
    vec3 fg_color=vec3(1.,0.,0.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
