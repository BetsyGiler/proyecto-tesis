# Architecture explanation  
This architecture consists of some componentes, the first one is *controllers* which 
must have all the logic to process the data and controll the ingress and egress of 
the network traffic. All the processes that will modify the database will be placed 
here. The second one is *models*, here will be a bounch of logic to manage some 
specific operations (just like Laravel does). The *services* will contain all the 
pieces of software that will do something sucha as controll the network traffic (
API service), security agents, recommender engines, etc.
