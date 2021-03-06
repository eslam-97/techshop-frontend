import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;

Vue.use(Vuex);

export const state = () => ({
  similarProducts: "",
  singleProduct: "",
  hotOffers: "",
  newArrival: "",
  bestSeller: "",
  filteredProducts: [],
  productCategories: "",
  productPrice: [0,0],

});
export const getters = {
  getSimilarProducts: state => state.similarProducts,
  getSingleProduct: state => state.singleProduct,
  getHotOffers: state => state.hotOffers,
  getNewArrival: state => state.newArrival,
  getBestSeller: state => state.bestSeller,
  getFilteredProducts: state => state.filteredProducts,
  getProductCategories: state => state.productCategories,
  getProductPrice: state => state.productPrice,

};
export const actions = {

  async ProductsPriceRange({ commit }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/prices", {
        params: {
          type: type
        }
      });
      commit('setPriceRange', res.data)
    } catch (Error) {
      console.log(Error);
    }
  },


  async similarProducts({ commit }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products", {
        params: {
          type: type,
        }
      });
      commit("setSimilarProducts", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async product({ commit }, [id]) {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${id}`);
      commit("setSingleProduct", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async hotOffers({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/products",
      {params:{
        order_by:'discount',
        order_dir:'desc'
      }});
      commit("setHotOffers", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async newArrival({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/products",
      {params:{
        order_by:'updated_at',
        order_dir:'desc'
      }});
      commit("setNewArrival", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async bestSeller({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/products",
      {params:{
        order_by:'sold',
        order_dir:'desc'
      }});
      commit("setBestSeller", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async searchProducts({ commit }, searchInput) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/search", {
        params: {
          searchInput: searchInput
        }
      });
      commit("setFilteredProducts", res.data.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async productCategories({ commit }) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products/categories"
      );
      commit("setProductCategories", res.data);
    } catch (Error) {
      console.log(Error);
    }
  }
};

export const mutations = {
  setSingleProduct: (state, data) => (state.singleProduct = data),
  setSimilarProducts: (state, data) => (state.similarProducts = data),
  setHotOffers: (state, data) => (state.hotOffers = data),
  setNewArrival: (state, data) => (state.newArrival = data),
  setBestSeller: (state, data) => (state.bestSeller = data),
  setFilteredProducts: (state, data) => (state.filteredProducts = data),
  setProductCategories: (state, data) => (state.productCategories = data),
  setPriceRange: (state, data) => (state.productPrice = data),

};
