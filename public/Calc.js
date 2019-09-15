window.onload = function(){
    var buttons = {"slash":"/",  "log":"log(", "exp":"exp(", "mult":"*",  "pow":"pow(",
                  "minus":"-", "openBracket": "(", "closeBracket":")", "dot":".", "plus":"+", "mod":"%",
                   "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "0":"0"},
        inputField = document.getElementById("inputField"),
        clc = 0;
    document.body.addEventListener("keydown", function(event){// inserimento espressione su input quando si premono tasti su tastiera
       inputField.focus();
    });

    inputField.addEventListener("keyup", function(event){// Valuta l'espressione quando si preme tasto invio
        if (event.keyCode === 13) {
            inputField.value = mathEval(inputField.value);
        }
    });

    function enterPressed(event) {
        if (event.keyCode === 13) {//premo invio
            inputField.value = mathEval(inputField.value);
        }
    }

    for (key in buttons){// Assegna semplici chiavi
            document.getElementById(key).addEventListener("click", function(){
                inputField.value += buttons[this.id];
            });
    }
       
    document.getElementById("equal").addEventListener("click", function(){// Calcola l'espressione dopo aver premuto
    //il tasto '=' sulla calcolatrice
        inputField.value = mathEval(inputField.value);
        });
    document.getElementById("del").addEventListener("click", function(){// Pulisce la sezione dell'imput sulla
    //calcolatrice dopo aver premuto 'C'
        inputField.value = "";
    });
    document.getElementById("equal").addEventListener("click", function(){//Pulisce il la sezione del''input anche dopo
    //aver effettuato il calcolo premendo il tasto '='
            inputField.value = "";
        });
             
    
   
    document.getElementById("del").addEventListener("dblclick", function(){// Pulisce la sezione di cronologia dopo
    //aver effettuato un doppio click su 'C'
        var historyEntry = document.getElementsByClassName("historyEntry");
        while (historyEntry[0]){
            historyEntry[0].parentNode.removeChild(historyEntry[0]);
        }
        document.getElementById("history").style.height = "1px"; // Reimposta il registro cronologia
    });

    addEvent(window, "resize", setHistoryHeight);// Reimposta l'altezza della finestra della cronologia e ridimensiona
}

function addHistoryEntry(expression, result){
    var historyEntry,
        entryTemplate = document.getElementById("historyTemplate");
        expSpan = document.createElement("span"),
        resSpan = document.createElement("span");
    // Imposta gli intervalli per espressione e risultato
    expSpan.innerHTML = expression;
    expSpan.className = "expression";
    resSpan.innerHTML = result;
    resSpan.className = "result";
    expSpan.addEventListener("dblclick", function(){
        document.getElementById("inputField").value = this.innerHTML;
    })
    resSpan.addEventListener("dblclick", function(){
        document.getElementById("inputField").value = this.innerHTML;
    })
    //Aggiunge alla sezione cronologia l'espressione e il risultato
    historyEntry = entryTemplate.cloneNode();
    historyEntry.removeAttribute("id");
    historyEntry.className += " historyEntry";
    historyEntry.appendChild(expSpan);
    historyEntry.appendChild(document.createTextNode(" = "))
    historyEntry.appendChild(resSpan);
    entryTemplate.parentNode.insertBefore(historyEntry, entryTemplate);
    setHistoryHeight(); //Controlla nella sezione cronologia se necessita di essere scrollabile
}
var addEvent = function(object, type, callback) {
    // uso della funzione addEvent ince di window.onsize
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

function setHistoryHeight(){
    var wrapHeight = document.getElementById("wrap").offsetHeight,
        windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        calcHeight = document.getElementById("calc").clientHeight,
        history = document.getElementById("history");
    if (windowHeight > 500) // Si considerano i margini 
        calcHeight += 140;
    else
        calcHeight += 35;
    if (wrapHeight > windowHeight){ // Se l'entry della cronologia supera lo spazio disponibile
        history.style.height = windowHeight - calcHeight + "px";
    } else if (history.scrollHeight < windowHeight - calcHeight) {// Si attiva lo scroll della cronologia quando necessario
        history.style.height = history.scrollHeight + "px";
    } else { // Occupa tutta l'altezza disponibile 
        history.style.height = windowHeight - calcHeight + "px";
    }
    history.scrollTop = history.scrollHeight; // Permette di scrollare la sezione cronologia quando viene aggiunto un elemento
}



function mathEval (exp) {
    var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
        valid = true,
        value = 0,
        virginExp = exp;

    // Rileva indentificatori JS e li sostitutisce
    exp = exp.replace(reg, function ($0) {
        // Se il nome dell'operatore appartiene a Math lo calcola
        if (Math.hasOwnProperty($0))
            return "Math."+$0;
        // Se l'espressione non è valida
        else
            valid = false;
            alert ('Calcolo non valido!')
    });

    // Non calcola se la funzione di sostituzione è non valida
    if (!valid)
        return virginExp;
    else
        try {
            value = eval(exp);
            if (virginExp === "" + value)
                return virginExp;
            addHistoryEntry(exp, value);
            return value;
        } catch (e) {return virginExp};

}