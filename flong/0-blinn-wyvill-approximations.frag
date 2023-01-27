/*
Blinn-Wyvill Approximation to the Raised Inverted Cosine
source: http://www.flong.com/archive/texts/code/shapers_poly/

Linear approximation for cosine wave
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
	
	float y=(4./9.)*pow(st.x,6.)-(17./9.)*pow(st.x,4.)+(22./9.)*pow(st.x,2.);
	float plt=plot(st,y);
	
	vec3 bg_color=vec3(0.,0.,1.);
	vec3 fg_color=vec3(1.,0.,0.);
	gl_FragColor=(1.-plt)*vec4(bg_color,1.)+plt*vec4(fg_color,1.);
}
