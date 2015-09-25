class TagsController < ApplicationController

  def create
    @tag = Tag.new
    @tag.game = Game.find(params[:game_id])
    @tag.player = @tag.game.player
    @tag.x = params[:x]
    @tag.y = params[:y]
    @tag.character = Character.find_by_name(params[:character])

    if @tag.save
      tag_data = @tag.to_json(:include => :character)

      respond_to do |format|
        format.json { render :json => tag_data, :status => :created }
      end
    else

      respond_to do |format|
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end
    end
  end


  def index
    @tags = Game.find(params[:game_id]).tags

    tag_data = @tags.to_json(:include => :character)

    respond_to do |format|
      format.json { render :json => tag_data, :status => 200 }
    end
  end


  def destroy
    @tag = Tag.find(params[:id])

    if @tag.destroy
      respond_to do |format|
        format.json { render :json => params[:id], :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end
    end
  end


end
