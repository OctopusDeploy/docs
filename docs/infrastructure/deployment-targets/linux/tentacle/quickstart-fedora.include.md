### Fedora

```bash Listening deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

curl https://s3.amazonaws.com/octopus-rpm-repo/tentacle.repo -o /etc/yum.repos.d/tentacle.repo
yum install tentacle

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

curl https://s3.amazonaws.com/octopus-rpm-repo/tentacle.repo -o /etc/yum.repos.d/tentacle.repo
yum install tentacle

/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```

```bash Listening worker
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in

curl https://s3.amazonaws.com/octopus-rpm-repo/tentacle.repo -o /etc/yum.repos.d/tentacle.repo
yum install tentacle

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling worker
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in

curl https://s3.amazonaws.com/octopus-rpm-repo/tentacle.repo -o /etc/yum.repos.d/tentacle.repo
yum install tentacle

/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```