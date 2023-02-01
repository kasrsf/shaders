/*
Double-Cubic Seat with Linear Blend
source: http://www.flong.com/archive/texts/code/shapers_poly/

The previous Double-Cubic Seat function can be generalized to a 
form which uses any odd integer exponent. In the code below, the 
parameter n controls the flatness or breadth of the plateau region 
in the vicinity of the point (a,b). A good working range for n is the
set of whole numbers from 1 to about 20.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float y) {
	return smoothstep(y - 0.005, y, st.y) - smoothstep(y, y + 0.005, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;

    float b = 0.4;
    float a = 0.7;
    float n = 5.;
    float x_lt_a = b - b * pow((1. - st.x/a), 2.*n+1.);
    float x_gt_a = b + (1. - b)*pow(((st.x-a)/(1.-a)), 2.*n+1.);
	float y = (1.0 - step(a, st.x)) * x_lt_a + step(a, st.x) * x_gt_a;

    float plt = plot(st, y);

	vec3 bg_color = vec3(0.0, 0.0, 1.0);
    vec3 fg_color = vec3(1.0, 0.0, 0.0);
	gl_FragColor = (1.0 - plt) * vec4(bg_color, 1.0) + plt * vec4(fg_color, 1.0);
}
