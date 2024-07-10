

app=angular.module('webApp',['ngRoute','web2','web3','web6','web5','web66','web7','web8']);
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'accueil.html',
        controller: 'HomeCtr1'
    })
    .when('/accueil',{
        templateUrl: 'accueil.html',
        controller: 'HomeCtr1'
    })
	.when('/vehicule',{
        templateUrl: 'vehicule.html',
        controller: 'vehicule'
    })
    .when('/mvehicule/:id',{
        templateUrl: 'mvehicule.html',
        controller: 'vehicule'
    })
    .when('/mclient/:id',{
        templateUrl: 'mclient.html',
        controller: 'client'
    })
    .when('/client',{
        templateUrl: 'client.html',
        controller: 'client'
    })
    .when('/Contrat',{
        templateUrl: 'Contrat.html',
        controller: 'Contrat'
    })
    .when('/mcontrat/:id',{
        templateUrl: 'mcontrat.html',
        controller: 'Contrat'
    })
    .when('/facture',{
        templateUrl: 'facture.html',
        controller: 'facture'
    })
    .when('/grages',{
        templateUrl: 'grages.html',
        controller: 'grage'
    })
    .when('/mgarages/:id',{
        templateUrl: 'mgarages.html',
        controller: 'mgrage'
    })

    .when('/Location',{
        templateUrl: 'Location.html',
        controller: 'Location'
    })
    .otherwise({
        redirectTo:'/'
    });
});
// controller de voiture ----------------------------------------------------------------------
app2=angular.module('web2',[]);
app2.controller('vehicule', function ($scope,$routeParams,$location) {

    var dbRef = firebase.database().ref();

    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.garage=faa(a);
        $scope.$apply(); // Update the view
    });

    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    function faa(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.nomg !=undefined){
            tableauFiltre.push(s);
         } 
        
        }
        
        return tableauFiltre;
      }

  // 1-insertion les voiture 
  $scope.insertData = function () {
      
    var vehicule = {
        numero: $scope.numero,
        type: $scope.type,
        marque: $scope.marque,
        modele: $scope.modele,
        puissance: $scope.puissance,
        selectedGarage: $scope.selectedGarage,
        statut : $scope.statut

      
    };

    dbRef.push(vehicule).then(
        alert("vous avez Ajouter avec succer")
    );

   
    $scope.numero = '';
    $scope.type = '';
    $scope.marque = '';
    $scope.modele = '';
    $scope.puissance = '';
    $scope.selectedGarage = '';
    $scope.statut= '';
};
      // 2- afficher les voiture
 
      dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.vehicule=filtrerObjetsNonVides(a);
        $scope.$apply(); // Update the view
    });

    function filtrerObjetsNonVides(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero !=undefined){
            tableauFiltre.push(s);
            
           
         } 
        
        }
        
        return tableauFiltre;
      }
        // 3- supprimer une voiture 

    $scope.deleteData = function (vehicule) {
        // Remove the person object from Firebase
        dbRef.child(vehicule.$id).remove().
        then (  alert("vous avez supprimer avec succer "));
      
    };
    //4- modifier un voiture

    
       // Function to update data
       $scope.updateData = function () {
        
        var id =  $routeParams.id;

        var vehicule = {
            numero: $scope.numero,
            type: $scope.type,
            marque: $scope.marque,
            modele: $scope.modele,
            puissance: $scope.puissance,
            selectedGarage: $scope.selectedGarage,
            statut : $scope.statut
    
          
        };
 
          
         // Update the person object in Firebase
        dbRef.child(id).update(vehicule).then(
         alert("vous avez modifier avec succer"),
         $location.path('/vehicule')
         
        );
 
           // Clear form fields
          
    $scope.numero = '';
    $scope.type = '';
    $scope.marque = '';
    $scope.modele = '';
    $scope.puissance = '';
    $scope.selectedGarage = '';
    $scope.statut= '';
           
     };  

    $scope.a='rrrr';
});
//----------------------------------------------------------------------------------------------
// controller de Client --------------------------------------------------------------------------------

app3=angular.module('web3',[]);
app3.controller('client', function ($scope,$routeParams,$location) {

    var dbRef = firebase.database().ref();

    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.garage=faa(a);
        $scope.$apply(); // Update the view
    });

    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    function faa(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.nomg !=undefined){
            tableauFiltre.push(s);
           
         } 
        
        }
        
        return tableauFiltre;
      }
      $scope.a="ee";

      // 1-insertion les clients 
    
    $scope.insertData = function () {
      
        var client = {
            numero_client: $scope.numeros,
            Nom_client: $scope.noms,
            Prenom: $scope.prenoms,
            Adresse__client: $scope.adresses,
            selectedGarages: $scope.selectedGarages
        };
    
        dbRef.push(client).then(
            alert("vous avez Ajouter avec succer")
        );
    
       
        $scope.numeros = '';
        $scope.noms = '';
        $scope.prenoms = '';
        $scope.adresses= '';
        $scope.selectedGarages = '';
    };

     // 2- afficher les client
 
     dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.client=filtrerObjetsNonVides(a);
        $scope.$apply(); // Update the view
    });

    function filtrerObjetsNonVides(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero_client !=undefined){
            tableauFiltre.push(s);
            
           
         } 
        
        }
        
        return tableauFiltre;
      }

      // 3- supprimer une client

    $scope.deleteData = function (client) {
        // Remove the person object from Firebase
        dbRef.child(client.$id).remove().
        then (  alert("vous avez supprimer avec succer "));
      
    };
      //4- modifier un client

    
       // Function to update data
       $scope.updateData = function () {
        
        var id =  $routeParams.id;

        var client = {
            numero_client: $scope.numeros,
            Nom_client: $scope.noms,
            Prenom: $scope.prenoms,
            Adresse__client: $scope.adresses,
            selectedGarages: $scope.selectedGarages
        };
 
          
         // Update the person object in Firebase
        dbRef.child(id).update(client).then(
         alert("vous avez modifier avec succer"),
         $location.path('/client')
         
        );
 
           // Clear form fields
          
           $scope.numeros = '';
           $scope.noms = '';
           $scope.prenoms = '';
           $scope.adresses= '';
           $scope.selectedGarages = '';
           
     }; 
    });
    
//-----------------------------------------------------------------------------------------

// controller de la page garage -------------------------------------------------------------

app6=angular.module('web6',[]);
app6.controller('grage', function ($scope) {
   
    var dbRef = firebase.database().ref();
    // 1-insertion 
    $scope.insertData = function () {
      
        var garage = {
            nomg: $scope.nomg,
            adressg: $scope.adressg
          
        };

        dbRef.push(garage).then(
            alert("vous avez Ajouter avec succer")
        );

       
        $scope.nomg = '';
        $scope.adressg = '';
     
    };
    // 2- afficher les garage 
 
    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.garage=filtrerObjetsNonVides(a);
        $scope.$apply(); // Update the view
    });

    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    function filtrerObjetsNonVides(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.nomg !=undefined){
            tableauFiltre.push(s);
            
           
         } 
        
        }
        
        return tableauFiltre;
      }
    // 3- supprimer un garage 

    $scope.deleteData = function (garage) {
        // Remove the person object from Firebase
        dbRef.child(garage.$id).remove().
        then (  alert("vous avez supprimer avec succer "));
      
    };

   $scope.a='rrrr';
    
    
});
//4- modifier un garage 
app66=angular.module('web66',[]);
app66.controller('mgrage', function ($scope,$routeParams,$location) {

    var dbRef = firebase.database().ref();
   

       // Function to update data
       $scope.updateData = function () {
        
       var id =  $routeParams.id;
       var garage = {
        nomg: $scope.nomg,
        adressg: $scope.adressg
      
    };

         
        // Update the person object in Firebase
       dbRef.child(id).update(garage).then(
        alert("vous avez modifier avec succer"),
        $location.path('/grages')
        
       );

          // Clear form fields
          $scope.nomg = '';
          $scope.adressg = '';
          
    };  
    
});
//------------------------------------------------------------------------------------------------

// contrller de la page Location --------------------------------------------------------------
app6=angular.module('web5',[]);
app6.controller('Location', function ($scope) {

    var dbRef = firebase.database().ref();

    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.vehicule=faa(a);
        $scope.client=foo(a);
        $scope.$apply(); // Update the view
    });

    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    function faa(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero !=undefined && s.statut ==="Disponible"){
            tableauFiltre.push(s);
           
         } 
        
        }
        
        return tableauFiltre;
      }

      function foo(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero_client !=undefined){
            tableauFiltre.push(s);
            
         } 
        
        }
        
        return tableauFiltre;
      }

      var e =' ';
      $scope.showForm1 = false;
      $scope.showForm2 = false;
      $scope.option="payment_cheque";
      $scope.changerOption = function() {
        if ($scope.option === "payment_cheque") {
            $scope.showForm2 = false;
            $scope.showForm1 = true;
             e=' ';
        } else if ($scope.option === "payment_carte") {
            $scope.showForm1 = false;
            $scope.showForm2 = true;
             e=$scope.date_ex;
        } else {
            $scope.showForm1 = false;
            $scope.showForm2 = false;
        }
    };
    $scope.change= function(){
        e=$scope.date_ex
    }
    $scope.updateResult = function() {
        $scope.distence = $scope.killometrage_f - $scope.killometrage_d;
    };
      // 1-insertion de location
      $scope.insertData = function () {
        var Location = {
            date_d: $scope.date_d,
            heur_d: $scope.heur_d,
            killometrage_d: $scope.killometrage_d,
            date_f: $scope.date_f,
            heur_f: $scope.heur_f,
            killometrage_f: $scope.killometrage_f,
            distence: $scope.distence,
            vehicules: $scope.vehicules,
            clients: $scope.clients,
            option: $scope.option,
            numero_fac: $scope.numero_fac,
            date_fac: $scope.date_fac,
            date_ex: e
          
        };
        function change (num,tableau){
          
        
            for (let i = 0; i < tableau.length; i++) {
              const s = tableau[i];
             
             if(s.numero ===num ){
                var id=s.$id;
                var vehicule = {
                    numero: s.numero,
                    type: s.type,
                    marque: s.marque,
                    modele: s.modele,
                    puissance: s.puissance,
                    selectedGarage: s.selectedGarage,
                    statut : "Loue"
            
                  
                };
               
                dbRef.child(id).update(vehicule). then(
                    console.log("yees ")
                );
                
             } 
            
            }
            
            
          }

        dbRef.push(Location).then(function() {
           
            alert("vous avez Ajouter avec succer") ;
          
            dbRef.on('value', function(snapshot) {
        
                num =Location.vehicules;
                a= snapshotToArray(snapshot);
                change(num,a);
                $scope.$apply(); // Update the view
            });
            
         } );
     

       
        $scope.date_d = '';
        $scope. heur_d = '';
        $scope.killometrage_d = '';
        $scope.date_f = '';
        $scope. heur_f = '';
        $scope.killometrage_f = '';
        $scope.distence = '';
        $scope.vehicules = '';
        $scope.clients = '';
        $scope.numero_fac = '';
        $scope.date_fac = '';
        $scope.date_ex = '';
     
    };
  

      $scope.a= "zz";
});
//------------------------------------------------------------------------------------------------
// controller de la page Contrat -------------------------------------------------------------------
app6=angular.module('web7',[]);
app6.controller('Contrat', function ($scope,$routeParams,$location) {
    var dbRef = firebase.database().ref();
    // 1- afficher un contrat 
    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.Contrat=filtrerObjetsNonVides(a);
        $scope.vehicule=faa(a);
        $scope.client=foo(a);
        $scope.$apply(); // Update the view
    });



    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    function faa(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero !=undefined){
            tableauFiltre.push(s);
         } 
        
        }
        
        return tableauFiltre;
      }

      function foo(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero_client !=undefined){
            tableauFiltre.push(s);
            
         } 
        
        }
        
        return tableauFiltre;
      }
    function filtrerObjetsNonVides(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero_fac !=undefined){
            tableauFiltre.push(s);
            
           
         } 
        
        }
        
        return tableauFiltre;
      }
      // 2- supprimer un contrat 


    $scope.deleteData = function (Location) {
        // Remove the person object from Firebase
        dbRef.child(Location.$id).remove().
        then (  alert("vous avez supprimer avec succer "));
      
    };
    // 3- modifier un contrat 
    var e =' ';
    $scope.showForm1 = false;
    $scope.showForm2 = false;
    $scope.option="payment_cheque";
    $scope.changerOption = function() {
      if ($scope.option === "payment_cheque") {
          $scope.showForm2 = false;
          $scope.showForm1 = true;
           e=' ';
      } else if ($scope.option === "payment_carte") {
          $scope.showForm1 = false;
          $scope.showForm2 = true;
           e=$scope.date_ex;
      } else {
          $scope.showForm1 = false;
          $scope.showForm2 = false;
      }
  };
  $scope.change= function(){
      e=$scope.date_ex
  }
  $scope.updateResult = function() {
      $scope.distence = $scope.killometrage_f - $scope.killometrage_d;
  };

  $scope.updateData = function () {
        
    var id =  $routeParams.id;
    var Location = {
        date_d: $scope.date_d,
        heur_d: $scope.heur_d,
        killometrage_d: $scope.killometrage_d,
        date_f: $scope.date_f,
        heur_f: $scope.heur_f,
        killometrage_f: $scope.killometrage_f,
        distence: $scope.distence,
        vehicules: $scope.vehicules,
        clients: $scope.clients,
        option: $scope.option,
        numero_fac: $scope.numero_fac,
        date_fac: $scope.date_fac,
        date_ex: e
      
    };

      
     // Update the person object in Firebase
    dbRef.child(id).update(Location).then(
     alert("vous avez modifier avec succer"),
     $location.path('/Contrat')
     
    );

       // Clear form fields
       $scope.date_d = '';
       $scope. heur_d = '';
       $scope.killometrage_d = '';
       $scope.date_f = '';
       $scope. heur_f = '';
       $scope.killometrage_f = '';
       $scope.distence = '';
       $scope.vehicules = '';
       $scope.clients = '';
       $scope.numero_fac = '';
       $scope.date_fac = '';
       $scope.date_ex = '';
       
 };  


$scope.a="contrt";
});
// ----------------------------------------------------------------------------------------------
// controller de page facture ----------------------------------------------------------------------
app6=angular.module('web8',[]);
app6.controller('facture', function ($scope,$routeParams,$location) {
    var dbRef = firebase.database().ref();
    dbRef.on('value', function(snapshot) {
        
        a= snapshotToArray(snapshot);
        $scope.Contrat=filtrerObjetsNonVides(a);
        $scope.$apply(); // Update the view
    });



    // Function to convert Firebase snapshot to an array
    function snapshotToArray(snapshot) {
        var array = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.$id = childSnapshot.key;
            array.push(item);
        });
        return array;
    }
    
    function filtrerObjetsNonVides(tableau) {
        const tableauFiltre = [];
        
        for (let i = 0; i < tableau.length; i++) {
          const s = tableau[i];
         
         if(s.numero_fac !=undefined){
            tableauFiltre.push(s);
            
           
         } 
        
        }
        
        return tableauFiltre;
      }
      // 2-supprimer le facture 
     


    $scope.deleteData = function (Location) {
        // Remove the person object from Firebase
        dbRef.child(Location.$id).remove().
        then (  alert("vous avez supprimer avec succer "));
      
    };
    $scope.a="hh";
});