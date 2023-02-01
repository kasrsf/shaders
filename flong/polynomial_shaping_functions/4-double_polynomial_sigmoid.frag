/*
Symmetric Double-Polynomial Sigmoids
source: http://www.flong.com/archive/texts/code/shapers_poly/

It is possible to generate sigmoid patterns by joining a symmetric
pair of polynomials at the center of the unit square. The exponents
in these equations (controlled by the integer parameter n) control
the steepness of the wall separating the squelched values from the
boosted ones; a suggested range for the whole number n is from 1 to about 10.
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
    
    float n=3.;
    float y=st.x;
    if(mod(n,2.)==2.){
        y=(1.-step(.5,st.x))*pow(2.*st.x,2.*n)/
        2.+step(.5,st.x)*(1.-pow(2.*st.x-2.,2.*n)/2.);
    }
    else{
        y=(1.-step(.5,st.x))*pow(2.*st.x,2.*n+1.)/
        2.+step(.5,st.x)*(1.+pow(2.*st.x-2.,2.*n+1.)/2.);
    }
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,1.);
    vec3 fg_color=vec3(1.,0.,0.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
