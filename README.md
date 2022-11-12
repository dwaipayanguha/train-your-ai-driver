<h1 style="text-align: center;">  TRAIN YOUR AI DRIVER </h1>

## Live Website : [train-your-ai-driver](https://train-your-ai-driver.netlify.app/)

https://user-images.githubusercontent.com/63494787/194945420-bdae9464-dc71-4cc0-a196-3092038bf1b1.mp4

<br>

# How to Play?

- Neural Network trains itself through parallel cars trying to manoeuvre through the traffic.

- The car with the sensors is the current best car in the simulation i.e. the car that has made the most progress through the traffic.

- Restart the training simulation with parallel cars mutated from your best car.

- Dump the current best car if you think its next generation models cannot successfully manoeuvre through the traffic.

- The 5 sensors are the inputs to the neural network. Their activations can be seen in the bottom-most layer of the neural network animation.


- The controls of the car (up, down, left, right) are the outputs of the neural network. The triggering of the controls can be seen in the top-most layer of the neural network animation.

# Control your simulation

- Modify number of lanes on the road

- Modify the hidden layers in the neural network and watch the cells in the layers of the network get triggered in the animation

- Add dummy traffic cars wherever you want to

# For developers

To start the app in localhost (default port is 3000) :

```bash
    npm start
```
