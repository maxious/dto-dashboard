Rails.application.routes.draw do

  unless Rails.env.production?
    devise_for :users,
      controllers: {
        sessions: "users/sessions"
      },
      :path => '',
      path_names: { sign_in: 'sign-in', sign_out: 'sign-out' }

    ActiveAdmin.routes(self)

    namespace :api, defaults: {format: 'json'} do
      namespace :v1 do
        resources :dashboards do
          resources :widgets
        end
        resources :datasets do
          resources :datapoints
        end
      end
    end

    get '/editor', :to => 'editor#index'
  end

  get root :to => 'dashboards#index'

  resources :dashboards, :only => [:index, :show] do
    member do
      get :export
    end
  end

  get 'feedback', :to => 'feedback#index'

  get '/index.html', :to => redirect('/')

  get '/copyright', :to => 'about#index'

end
