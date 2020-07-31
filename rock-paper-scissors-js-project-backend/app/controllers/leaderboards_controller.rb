class LeaderboardsController < ApplicationController

    def index
        users = Leaderboard.all
        render json: LeaderboardSerializer.new(users)
    end

    def create
        user = Leaderboard.create(:name => params[:name], :score => params[:score])
        render json: user
    end

end