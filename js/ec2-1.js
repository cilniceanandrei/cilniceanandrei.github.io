document.getElementById("id_business_version").innerHTML = "Business version: 2018.10.12.3";
//-----------------------------------------------------------------------------------------------
function read_data()
{
	var _a= document.getElementById("id_a").value;
	var _b= document.getElementById("id_b").value;
	var _c= document.getElementById("id_c").value;
	var coef = {a:_a, b:_b, c:_c};
	return coef;
}
//-----------------------------------------------------------------------------------------------
function compute_delta(coef)
{
	return coef.b * coef.b - 4 * coef.a * coef.c;
}
//-----------------------------------------------------------------------------------------------
function solve(coef)
{
	var delta = compute_delta(coef);
	var x1_re, x1_im, x2_re, x2_im;
	if(delta >= 0){
		x1_re= (-coef.b - Math.sqrt(delta)) / (2 * coef.a);
		x1_im= 0;
		x2_re= (-coef.b + Math.sqrt(delta)) / (2 * coef.a);
		x2_im= 0;
	}
	else{
		x1_re= -coef.b / (2 * coef.a);
		x1_im= -Math.sqrt(-delta)/ (2 * coef.a);
		x2_re= -coef.b / (2 * coef.a);
		x2_im= Math.sqrt(-delta)/ (2 * coef.a);
	}
	var x1 = {re:x1_re, im:x1_im};
	var x2 = {re:x2_re, im:x2_im};
	var solutions = {x1:x1, x2:x2};
	return solutions;
}
//-----------------------------------------------------------------------------------------------
function print_solutions(solutions)
{
	document.getElementById("id_x1").innerHTML = solutions.x1.re + " + " + solutions.x1.im + "i";
	document.getElementById("id_x2").innerHTML = solutions.x2.re + " + " + solutions.x2.im + "i";
}
//-----------------------------------------------------------------------------------------------
function solve()
{
	var coef = read_data();
	var solutions= solve(coef);
	print_solutions(solutions);

	
	
	

}