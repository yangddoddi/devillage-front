import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
  Navigate,
} from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Join } from "../page/join/Join";
import { PostEditor } from "../components/posts/PostEditor";
import { useEffect, useState } from "react";
import { PostView } from "../components/posts/PostView";
import { Profiles } from "../page/mypage/Profiles";
import { useSelector, useDispatch } from "react-redux";
import { OauthLogin } from "../util/oauth/OauthLogin";
import { Temp } from "../page/mypage/Temp";
import { Bookmark } from "../page/bookmark/Bookmark";
import { SearchList } from "../page/searchList/searchList";
import { TagList } from "../page/taglist/tagList";
import { PrivateRoute } from "./privateRoute";
import { Chat } from "../page/chat/chat";
import { ChatRoom } from "../page/chat/chatroom";
import { Root } from "./root";
import { Rank } from "../page/rank/rank";

export const RouterConfig = () => {
  // const isLogin = useSelector((state) => state.token.);
  const [category, setCategory] = useState("all");

  const sendCategory = (category) => {
    setCategory(category);
  };

  return (
    <HashRouter>
      <Header sendCategory={sendCategory} />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/board/:category" element={<Main category={category} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/:id" element={<PostView />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute path="/mypage">
              <Profiles />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute path="/posts">
              <PostEditor />
            </PrivateRoute>
          }
        />
        {/* <Route path="/users/:id" element={<Profiles />} /> */}
        <Route path="/login/oauth" element={<OauthLogin />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/search/:id" element={<SearchList />} />
        <Route path="/tag/:id" element={<TagList />} />
        <Route path="/edit/:id" element={<PostEditor />} />
        <Route
          path="board/chat"
          element={
            <PrivateRoute path="board/chat">
              <ChatRoom />
            </PrivateRoute>
          }
        />
        <Route path="/board/ranking" element={<Rank />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};
