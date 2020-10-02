### Archive (Linux Arm64)

:::warning
Linux Arm64 support is currently experimental.
:::

```bash Listening deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus Server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

curl -L https://octopus.com/downloads/latest/Linux_Arm64TarGz/OctopusTentacle --output tentacle-linux_arm64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-linux_arm64.tar.gz -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle service --install --start
```

```bash Polling deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

curl -L https://octopus.com/downloads/latest/Linux_Arm64TarGz/OctopusTentacle --output tentacle-linux_arm64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-linux_arm64.tar.gz -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True --reset-trust --app "$applicationPath"
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle service --install --start
```

```bash Listening worker
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus Server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

curl -L https://octopus.com/downloads/latest/Linux_Arm64TarGz/OctopusTentacle --output tentacle-linux_arm64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-linux_arm64.tar.gz -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in worker pool $workerPool"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool"
/opt/octopus/tentacle/Tentacle service --install --start
```

```bash Polling worker
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

curl -L https://octopus.com/downloads/latest/Linux_Arm64TarGz/OctopusTentacle --output tentacle-linux_arm64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-linux_arm64.tar.gz -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True --reset-trust --app "$applicationPath"
echo "Registering the Tentacle $name with server $serverUrl in worker pool $workerPool"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle service --install --start
```
