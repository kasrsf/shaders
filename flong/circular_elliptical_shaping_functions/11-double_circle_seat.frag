/*
Double-Circle Seat
source: http://www.flong.com/archive/texts/code/shapers_circ/

This shaping function is formed by the meeting of two circular arcs,
which join with a horizontal tangent. The parameter a, in the range [0...1],
governs the location of the curve's inflection point along the diagonal of the unit square.
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

float double_circle_seat(float x, float a){
    float min_param_a = 0.0;
    float max_param_a = 1.0;
    a = max(min_param_a, min(max_param_a, a));
    
	float y = 0.;
    if (x <= a) {
        y = sqrt(pow(a, 2.) - pow(x - a, 2.));
    } else {
        y = 1. - sqrt(pow(1. - a, 2.) - pow(x - a, 2.));
    }
    return y;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    

    float y = double_circle_seat(st.x, 0.4);
    
    float plt=plot(st,y);
 	
    vec3 color = vec3(y);
    vec3 fg_color=vec3(0.,1.,0.);
    color=(1.-plt)*color+plt*fg_color;
    
    gl_FragColor = vec4(color, 1.);
}
