/*
Double-Cubic Seat with Linear Blend
source: http://www.flong.com/archive/texts/code/shapers_poly/

This modified version of the Double-Cubic Seat function uses a single variable
to control the location of its inflection point along the diagonal of the unit square.
A second parameter is used to blend this curve with the Identity Function (y=x).
Here, we use the variable b to control the amount of this blend, which has the effect
of tilting the slope of the curve's plateau in the vicinity of its inflection point.
The adjustable flattening around the inflection point makes this a useful shaping function
for lensing or magnifying evenly-spaced data.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float y){
    return smoothstep(y-.005,y,st.y)-smoothstep(y,y+.005,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float b=.1;
    float a=.5;
    float x_lt_a=b*st.x+(1.-b)*a*(1.-pow((1.-st.x/a),3.));
    float x_gt_a=b*st.x+(1.-b)*(a+(1.-a)*pow((st.x-a)/(1.-a),3.));
    float y=(1.-step(a,st.x))*x_lt_a+step(a,st.x)*x_gt_a;
    
    float plt=plot(st,y);
    
    vec3 bg_color=vec3(0.,0.,1.);
    vec3 fg_color=vec3(1.,0.,0.);
    gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
