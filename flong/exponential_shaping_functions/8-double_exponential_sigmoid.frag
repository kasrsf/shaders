/*
Double-Exponential Sigmoid
source: http://www.flong.com/archive/texts/code/shapers_exp/

Sigmoids from pairs of exponential functions. These have the advantage
that the control parameter a can be continously varied between 0 and 1,
and are therefore very useful as adjustable-contrast functions. However,
they are more expensive to compute than the polynomial sigmoid flavors.
The Double-Exponential Sigmoid approximates the Raised Inverted Cosine to
within 1% when the parameter a is approximately 0.426.
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
    
    float a=.426;
    a=1.-a;
    float y=(1.-step(.5,st.x))*(pow(2.*st.x,1./a)/2.)+step(.5,st.x)*(1.-(pow((2.*(1.-st.x)),1./a)/2.));
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,0.);
    vec3 fg_color=vec3(1.,1.,1.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
