class UsersController < ApplicationController

    def index
        users = User.all
        options = {
            include: [:scores]
        }
        render json: UserSerializer.new(users, options)
    end

    def show
        user = User.find_by(id: params[:id])
        options = {
            include: [:scores]
        }
        render json: UserSerializer.new(user, options)
    end

    def create
        user = User.find_or_create_by(:name => params[:_json])
        render json: user
    end

    def update
        user = User.find(params[:id])
        if user
            score = Score.create(:score => params[:_json], :user_id => params[:id])
        end
        render json: score
    end

end