/**
 * Example of how to use:
 * var confirmBox = new Lightbox("confirm", "message here", "heading here", funcOK, funcCancel);
 * confirmBox.createBox();
 *
 * var alertBox = new Lightbox("alert", "alert message here", "alert heading here", funcOK);
 * alertBox.createBox();
 * 
 * Anonymous functions can also be used::
 * var alertBox = new Lightbox("alert", "alert message here", "alert heading here", function(){
 * 	alert("test");
 * });
 * alertBox.createBox();
 *
 * ========================================================================
 * 
 * @param type - string - "confirm" or "alert" - type of lightbox
 * @param message - String - message to be shown in confirm box
 * @param header - String - header shown in confirm box
 * @param okFunction - optional - function to fire on OK button click - an anon func can be passed in if required
 * @param cancelFunction - optional - function to fire on Cancel button click - an anon func can be passed in if required
 * @return
 */

//Lightbox Constructor
function Lightbox(type, message, header, okFunction, cancelFunction){
	this.type = type;	
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
			
Lightbox.prototype.events = function(){
	var that = this;
	
	/**
	* Elements that will close the lightbox and background
	**/
	if (this.type == "confirm"){
		var arrElemsToCancelLightbox = [this.background,this.cancelBtn]; 
		
		for (i=0; i<arrElemsToCancelLightbox.length; i++){
			arrElemsToCancelLightbox[i].addEventListener("click", function(){
				that.background.remove(); //remove the background
				that.lightboxContainer.remove(); //remove lightbox
				that.output = "cancel";
				
				if (typeof that.cancelFunc != "undefined"){
					that.cancelFunc(); //execute function
				}
			});
		}
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

Lightbox.prototype.createBox = function(){
	this.background = document.createElement("div");
	this.lightboxContainer = document.createElement("div");
	this.msgContainer = document.createElement("div");
	this.headerContainer = document.createElement("h1");
	this.msg = document.createElement("p");
	this.btnContainer = document.createElement("div");
	this.okBtn = document.createElement("div");
	
	this.lightboxContainer.id = "lightboxContainer";
	this.msgContainer.id = "msgContainer";
	this.btnContainer.id = "btnContainer";
	this.background.id = "lightboxBackground";
	
	if (this.type == "confirm"){
		this.okBtn.id = "OKBtn";
	}
	else{
		this.okBtn.id = "fullWidthOKBtn";
	}
	
	this.headerContainer.innerHTML = this.header;
	this.msg.innerHTML = this.message;
	this.okBtn.innerHTML = "OK";
	
	this.msgContainer.appendChild(this.headerContainer);
	this.msgContainer.appendChild(this.msg);
	
	if (this.type == "confirm"){
		this.cancelBtn = document.createElement("div");
		this.cancelBtn.id = "cancelBtn";
		this.cancelBtn.innerHTML = "Cancel";
		this.btnContainer.appendChild(this.cancelBtn);
	}
	
	this.btnContainer.appendChild(this.okBtn);
	this.lightboxContainer.appendChild(this.msgContainer);
	this.lightboxContainer.appendChild(this.btnContainer);
	
	document.body.appendChild(this.lightboxContainer);
	
	document.body.appendChild(this.background);
	
	this.events();
}
