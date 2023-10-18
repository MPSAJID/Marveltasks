const New = document.querySelector('#rec');
New.addEventListener('click',Cook);
function recipe(stepNumber, stepDescription, callback) {
    const stepElement = document.querySelector(`#p${stepNumber}`);
    stepElement.innerHTML= `${stepNumber}: ${stepDescription}`;
    setTimeout(callback, 1000);
}

function Cook() {
    recipe(1, "Wash the mutton and marinate it with spices.", function () {
        recipe(2, "Soak the rice in water for 30 minutes.", function () {
            recipe(3, "Fry the onions until golden brown.", function () {
                recipe(4, "Cook the marinated mutton until tender.", function () {
                    recipe(5, "Boil the soaked rice until it's 70% cooked.", function () {
                        recipe(6, "Layer the rice and mutton in a large pot.", function () {
                            recipe(7, "Add saffron milk and ghee on top.", function () {
                                recipe(8, "Cover and cook on low heat until done.", function () {
                                    recipe(9, "Let it rest for 10 minutes before serving.", function () {
                                        recipe(10, "Serve your delicious Hyderabadi Mutton Biryani!", function () {
                                            console.log("Recipe is complete!");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

    
    

    
    


