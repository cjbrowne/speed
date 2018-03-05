# Status

The current build will get you a working shell in which you can test cars on a very crudely-drawn "spa" circuit.

# Running

Simply 'npm start' in this directory to start the client.

# Help Wanted

The next step is to figure out how to write the 'sensors' for the car.  They should be able to detect
the track edge, any obstacles on the track (e.g. other cars) and report back the distance to the edge/obstacle.
The obstacle bit is fairly easy, just cast a ray from the car and see if it hits any other cars (we know where
all the cars are).  The track edge, on the other hand, is more tricky - to know how far away the track edge
is, we need to have some format encoding the different surfaces of the track.  Ideally this should be
decoupled from the track image, since I want to be able to upgrade the artwork as time goes on.

If you have any ideas how to accomplish this, please get in touch!  Doesn't have to be fleshed out, just a basic
idea of an approach that we could discuss would already be very welcome.  You can find my contact details on my
github profile.