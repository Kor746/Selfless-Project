import Bluebird from "bluebird";
import * as React from "react";
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import {
    NavigationScreenConfig,
    NavigationScreenOptions,
} from "react-navigation";
import SocketIOClient from "socket.io-client";
import { BaseScreenProps } from "App/view/index";

const WEBSOCKET: string = "";

export class CameraScreen extends React.Component<
    BaseScreenProps, { messages: Array<string> }
    > {
    public static readonly navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        title: "Home",
    };

    private camera = null;
    private socket: SocketIOClient.Socket;

    constructor(props: BaseScreenProps) {
        super(props);
        this.state = {
            messages: [],
        };

        this.requestSavePermission();

        this.socket = SocketIOClient(WEBSOCKET);
        this.socket.on("prediction", (json) => {
            this.setState({
                messages: [json.messages],
            });
        });
    }

    public render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={"We need your permission to use your camera phone"}
                    onCameraReady={() => {
                        this.takePicture();
                    }}
                />
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                    {this.state.messages.map((msg) => <Text> {msg} </Text>)}
                </View>
                <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={this.savePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    public takePicture(): Bluebird<void> {
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                doNotSave: true,
            };
            Bluebird.resolve(
                this.camera.takePictureAsync(options),
            ).then((data) => {

                this.socket.emit("prediction", 'hello');
            }).then(() => {
                setTimeout(() => {
                    this.takePicture();
                }, 2000);
            });
        }

        return Bluebird.resolve();
    }

    public savePicture() {
        if (this.camera) {
            const options = {
                quality: 1.0,
                base64: true,
                doNotSave: false,
            };
            return this.camera.takePictureAsync(options).then((data) => {
                console.log(data.uri);
            });
        }

        return Bluebird.resolve();
    }

    public async requestSavePermission() {
        try {
            const grantedRead = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                },
            );
            const grantedWrite = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                },
            );
            if (grantedRead === PermissionsAndroid.RESULTS.GRANTED &&
                grantedWrite === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    private async sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private async wait() {
        await this.sleep(666);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
    },
});
