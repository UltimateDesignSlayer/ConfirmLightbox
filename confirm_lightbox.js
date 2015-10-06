/**
 * Example of how to use:
 * 
 * var myConfirmBox = new ConfirmLightbox("My message goes here", "Box header goes here", myFunctionWhenOK, myFunctionWhenCancel);
 * myConfirmBox.createBox();
 * 
 * or use with anon functions
 * 
 * var myConfirmBox = new ConfirmLightbox("My message goes here", "Box header goes here", function(){
 * 	alert("OK was clicked");
 * },
 * 	function(){
 * 	alert("Cancel was clicked");
 * }
 * );
 * myConfirmBox.createBox();
 * 
 * ========================================================================
 * 
 * @param message - String - message to be shown in confirm box
 * @param header - String - header shown in confirm box
 * @param okFunction - optional - function to fire on OK button click - an anon func can be passed in if required
 * @param cancelFunction - optional - function to fire on Cancel button click - an anon func can be passed in if required
 * @return
 */

//Confirm Lightbox Constructor
function ConfirmLightbox(message, header, okFunction, cancelFunction){
	this.message = message;
	this.header = header;
	
	//output would be "cancel" or "ok" depending on whats clicked. We use this to check what the outcome will be.
	this.output = "";
	
	/**
	Functions that execute when lightbox is OKed or Cancelled are optional
	**/				
	//This is the function that will fire if OK is clicked.
	this.okFunc = okFunction;
	
	//This function will execute when lightbox is cancelled
	this.cancelFunc = cancelFunction;
}
			
ConfirmLightbox.prototype.events = function(){
	var that = this;
	
	/**
	* Elements that will close the lightbox and background
	**/
	var arrElemsToCloseLightbox = [this.background,this.cancelBtn]; 
	
	for (i=0; i<arrElemsToCloseLightbox.length; i++){
		arrElemsToCloseLightbox[i].addEventListener("click", function(){
			that.background.remove(); //remove the background
			that.lightboxContainer.remove(); //remove lightbox
			that.output = "cancel";
			
			if (typeof that.cancelFunc != "undefined"){
				that.cancelFunc(); //execute function
			}
		});
	}
	
	/**
	* OK button
	**/
	this.okBtn.addEventListener("click", function(){
		that.background.remove(); //remove the background
		that.lightboxContainer.remove(); //remove lightbox
		that.output = "ok";	
		if (typeof that.okFunc != "undefined"){
			that.okFunc(); //execute function
		}
	});
}

ConfirmLightbox.prototype.createBox = function(){
	this.background = document.createElement("div");
	this.lightboxContainer = document.createElement("div");
	this.msgContainer = document.createElement("div");
	this.headerContainer = document.createElement("h1");
	this.msg = document.createElement("p");
	this.btnContainer = document.createElement("div");
	this.cancelBtn = document.createElement("div");
	this.okBtn = document.createElement("div");
	
	this.lightboxContainer.id = "lightboxContainer";
	this.msgContainer.id = "msgContainer";
	this.btnContainer.id = "btnContainer";
	this.background.id = "lightboxBackground";
	this.cancelBtn.id = "cancelBtn";
	this.okBtn.id = "OKBtn";
	
	this.headerContainer.innerHTML = this.header;
	this.msg.innerHTML = this.message;
	this.cancelBtn.innerHTML = "Cancel";
	this.okBtn.innerHTML = "OK";
	
	this.msgContainer.appendChild(this.headerContainer);
	this.msgContainer.appendChild(this.msg);
	this.btnContainer.appendChild(this.cancelBtn);
	this.btnContainer.appendChild(this.okBtn);
	this.lightboxContainer.appendChild(this.msgContainer);
	this.lightboxContainer.appendChild(this.btnContainer);
	
	document.body.appendChild(this.lightboxContainer);
	
	document.body.appendChild(this.background);
	
	this.events();
}
