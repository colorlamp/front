import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import '@channel.io/bezier-react/styles.css'
import './index.css'

/**테스트용 페이지입니다. */
interface ChannelIOWamMock {
  getWamData: (key: string) => string | null;
  close: ({
    appId,
    name,
    params,
  }: {
    appId?: string;
    name?: string;
    params?: Record<string, any>;
  }) => void;
  setSize: ({ width, height }: { width: number; height: number }) => void;
  callFunction: ({
    appId,
    name,
    params,
  }: {
    appId: string;
    name: string;
    params: Record<string, any>;
  }) => Promise<any>;
  callNativeFunction: ({
    name,
    params,
  }: {
    name: string;
    params: Record<string, any>;
  }) => Promise<any>;
  callCommand: ({
    appId,
    name,
    params,
  }: {
    appId: string;
    name: string;
    params: Record<string, any>;
  }) => void;
}
const mockChannelIOWam: ChannelIOWamMock = {
  getWamData: (key: string) => {
    if (key === "appearance") {
      return "dark";
    }
    if (key === "chatTitle") {
      return "안녕";
    }
    if (key === "appId") {
      return "appId";
    }
    if (key === "channelId") {
      return "channelId";
    }
    if (key === "managerId") {
      return "managerId";
    }
    if (key === "message") {
      return "message";
    }
    if (key === "chatId") {
      return "chatId";
    }
    if (key === "chatType") {
      return "chatType";
    }
    if (key === "broadcast") {
      return "broadcast";
    }
    if (key === "rootMessageId") {
      return "rootMessageId";
    }

    return "mockedData";
  },
  close: ({ appId, name, params } = {}) => {
    console.log("close called", { appId, name, params });
  },
  setSize: ({ width, height }) => {
    console.log("setSize called", { width, height });
  },
  callFunction: async ({ appId, name, params }) => {
    console.log("callFunction called", { appId, name, params });
    return Promise.resolve("functionResult");
  },
  callNativeFunction: async ({ name, params }) => {
    console.log("callNativeFunction called", { name, params });
    return Promise.resolve("nativeFunctionResult");
  },
  callCommand: ({ appId, name, params }) => {
    console.log("callCommand called", { appId, name, params });
  },
};

(window as any).ChannelIOWam = mockChannelIOWam;
/** */

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)